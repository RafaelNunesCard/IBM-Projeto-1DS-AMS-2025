<?php
/**
 * TechFix — Logica de autenticacao (sessoes PHP nativas)
 */

declare(strict_types=1);

require_once __DIR__ . '/Mail.php';

final class Auth
{
    public static function iniciarSessao(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function logout(): void
    {
        self::iniciarSessao();
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                (bool) $params['secure'],
                (bool) $params['httponly']
            );
        }
        session_destroy();
    }

    public static function usuarioLogado(): ?array
    {
        self::iniciarSessao();
        if (empty($_SESSION['usuario_id'])) {
            return null;
        }

        $stmt = Database::getInstance()->prepare(
            'SELECT id, nome, email, tipo, telefone, avatar_url, bio, educacao, preco_dia, created_at
             FROM usuarios
             WHERE id = ? LIMIT 1'
        );
        $stmt->execute([(int) $_SESSION['usuario_id']]);
        $user = $stmt->fetch();

        return $user === false ? null : self::formatarUsuario($user);
    }

    public static function login(string $email, string $senha): array
    {
        self::iniciarSessao();

        $emailNormalizado = trim(strtolower($email));
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare(
            'SELECT id, nome, email, senha_hash, tipo, telefone, avatar_url, bio, educacao, preco_dia, created_at
             FROM usuarios
             WHERE email = ? LIMIT 1'
        );
        $stmt->execute([$emailNormalizado]);
        $user = $stmt->fetch();

        if ($user === false || !password_verify($senha, (string) $user['senha_hash'])) {
            return [
                'ok'      => false,
                'status'  => 401,
                'erro'    => 'credenciais_invalidas',
                'mensagem' => 'Email ou senha invalidos.',
            ];
        }

        session_regenerate_id(true);
        $_SESSION['usuario_id'] = (int) $user['id'];

        return ['ok' => true, 'usuario' => self::formatarUsuario($user)];
    }

    public static function registrar(array $input): array
    {
        self::iniciarSessao();

        $nome = trim((string) ($input['nome'] ?? ''));
        $email = trim(strtolower((string) ($input['email'] ?? '')));
        $senha = (string) ($input['senha'] ?? '');
        $tipo = (($input['tipo'] ?? 'cliente') === 'profissional') ? 'profissional' : 'cliente';
        $profissao = $input['profissao'] ?? null;

        if ($nome === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($senha) < 6) {
            return [
                'ok'      => false,
                'status'  => 422,
                'erro'    => 'validacao',
                'mensagem' => 'Nome, email valido e senha (minimo 6 caracteres) sao obrigatorios.',
            ];
        }

        if ($tipo === 'profissional' && trim((string) $profissao) === '') {
            return [
                'ok'      => false,
                'status'  => 422,
                'erro'    => 'validacao',
                'mensagem' => 'Conte qual é a sua profissão ou especialidade.',
            ];
        }

        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        if ($stmt->fetch() !== false) {
            return [
                'ok'      => false,
                'status'  => 409,
                'erro'    => 'email_existente',
                'mensagem' => 'Ja existe uma conta cadastrada com este email.',
            ];
        }

        $hash = password_hash($senha, PASSWORD_BCRYPT);
        $telefone = trim((string) ($input['telefone'] ?? ''));
        $telefone = $telefone === '' ? null : $telefone;

        $stmt = $pdo->prepare(
            'INSERT INTO usuarios (nome, email, senha_hash, tipo, telefone, preco_dia, profissao)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $nome,
            $email,
            $hash,
            $tipo,
            $telefone,
            $profissao !== null ? (float) ($input['preco_dia'] ?? 0) : null,
            $profissao,
        ]);

        $id = (int) $pdo->lastInsertId();
        session_regenerate_id(true);
        $_SESSION['usuario_id'] = $id;

        $stmt = $pdo->prepare(
            'SELECT id, nome, email, tipo, telefone, avatar_url, bio, educacao, profissao, preco_dia, created_at
             FROM usuarios WHERE id = ? LIMIT 1'
        );
        $stmt->execute([$id]);
        $user = $stmt->fetch();

        return ['ok' => true, 'status' => 201, 'usuario' => self::formatarUsuario($user)];
    }

    public static function solicitarRecuperacao(string $email): array
    {
        self::iniciarSessao();
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT id, nome, email FROM usuarios WHERE email = ? LIMIT 1');
        $stmt->execute([trim(strtolower($email))]);
        $user = $stmt->fetch();

        if ($user === false) {
            // Resposta generica para nao revelar se o e-mail existe
            return [
                'ok'      => true,
                'status'  => 200,
                'mensagem' => 'Se o e-mail informar possuir uma conta, um link de recuperacao sera enviado.',
            ];
        }

        $token = bin2hex(random_bytes(32));
        $stmt = $pdo->prepare('UPDATE usuarios SET reset_token = ?, reset_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id = ?');
        $stmt->execute([$token, (int) $user['id']]);

        // Envia e-mail com link de recuperacao (ex.: /HTML/esqueceu.html?token=...&email=...)
        $link = 'http://localhost:8000/HTML/esqueceu.html?token=' . urlencode($token) . '&email=' . urlencode($user['email']);
        $mailCorpo = 'Recuperacao de senha TechFix: ' . $link;
        Mail::enviar((string) $user['email'], 'Recuperacao de senha - TechFix', $mailCorpo);

        return [
            'ok'      => true,
            'status'  => 200,
            'reset_token' => $token,
            'mensagem' => 'Se o e-mail informar possuir uma conta, um link de recuperacao sera enviado.',
        ];
    }

    public static function redefinirSenha(string $token, string $senha): array
    {
        if (trim($token) === '' || strlen($senha) < 6) {
            return ['ok' => false, 'status' => 422, 'erro' => 'validacao', 'mensagem' => 'Token e senha (minimo 6 caracteres) sao obrigatorios.'];
        }

        $pdo = Database::getInstance();

        $stmt = $pdo->prepare(
            'SELECT id, email FROM usuarios
             WHERE reset_token = ? AND reset_expires IS NOT NULL AND reset_expires > NOW()
             LIMIT 1'
        );
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if ($user === false) {
            return ['ok' => false, 'status' => 404, 'erro' => 'token_invalido', 'mensagem' => 'Token de recuperacao invalido ou expirado.'];
        }

        $hash = password_hash($senha, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('UPDATE usuarios SET senha_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?');
        $stmt->execute([$hash, (int) $user['id']]);

        Auth::logout();

        return ['ok' => true, 'status' => 200, 'mensagem' => 'Senha redefinida com sucesso.'];
    }

    private static function gerarToken(int $usuarioId, string $email, string $tipo): string
    {
        $segredo = (string) (getenv('JWT_SECRET') ?: 'techfix-dev-secret');
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = [
            'sub'    => $usuarioId,
            'email'  => $email,
            'tipo'   => $tipo,
            'iat'    => time(),
            'exp'    => time() + 3600,
        ];

        $h = self::base64url(json_encode($header));
        $p = self::base64url(json_encode($payload));
        $sig = self::base64url(hash_hmac('sha256', $h . '.' . $p, $segredo, true));

        return $h . '.' . $p . '.' . $sig;
    }

    private static function base64url(string $dados): string
    {
        return rtrim(strtr(base64_encode($dados), '+/', '-_'), '=');
    }

    private static function assinar(string $dados): string
    {
        $segredo = (string) (getenv('JWT_SECRET') ?: 'techfix-dev-secret');
        return self::base64url(hash_hmac('sha256', $dados, $segredo, true));
    }

    public static function validarToken(string $token): ?array
    {
        $partes = explode('.', $token);
        if (count($partes) !== 3) {
            return null;
        }

        [$h, $p, $s] = $partes;
        if (self::assinar($h . '.' . $p) !== $s) {
            return null;
        }

        $payload = json_decode(base64_decode(strtr($p, '-_', '+/')), true);
        if (!is_array($payload)) {
            return null;
        }

        if (isset($payload['exp']) && (int) $payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    private static function formatarUsuario(array $user): array
    {
        return [
            'id'          => (int) $user['id'],
            'nome'        => (string) $user['nome'],
            'email'       => (string) $user['email'],
            'tipo'        => (string) $user['tipo'],
            'telefone'    => $user['telefone'],
            'avatar_url'  => $user['avatar_url'],
            'bio'         => $user['bio'],
            'educacao'   => $user['educacao'],
            'profissao'   => $user['profissao'],
            'preco_dia'   => $user['preco_dia'] !== null ? (float) $user['preco_dia'] : null,
            'created_at'  => $user['created_at'],
        ];
    }
}
