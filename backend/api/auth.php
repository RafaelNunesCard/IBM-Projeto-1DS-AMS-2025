<?php
/**
 * TechFix — API de Autenticacao (Fase 2)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../src/Auth.php';

function api_auth_login(array $input): void
{
    $email = trim(strtolower((string) ($input['email'] ?? '')));
    $senha = (string) ($input['senha'] ?? '');

    if ($email === '' || $senha === '') {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'Email e senha sao obrigatorios.']);
        return;
    }

    $resultado = Auth::login($email, $senha);

    if (!($resultado['ok'] ?? false)) {
        http_response_code((int) ($resultado['status'] ?? 401));
        echo json_encode([
            'status'  => 'erro',
            'erro'    => $resultado['erro'] ?? 'falha',
            'mensagem' => $resultado['mensagem'] ?? 'Nao foi possivel realizar o login.',
        ]);
        return;
    }

    http_response_code(200);
    echo json_encode(['status' => 'ok', 'dados' => ['usuario' => $resultado['usuario']]]);
}

function api_auth_register(array $input): void
{
    $nome = trim((string) ($input['nome'] ?? ''));
    $email = trim(strtolower((string) ($input['email'] ?? '')));
    $senha = (string) ($input['senha'] ?? '');
    $tipo = (($input['tipo'] ?? 'cliente') === 'profissional') ? 'profissional' : 'cliente';

    if ($nome === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($senha) < 6) {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'Nome, email valido e senha (minimo 6 caracteres) sao obrigatorios.']);
        return;
    }

    $resultado = Auth::registrar([
        'nome'      => $nome,
        'email'     => $email,
        'senha'     => $senha,
        'tipo'      => $tipo,
        'telefone'  => $input['telefone'] ?? null,
        'profissao' => $input['profissao'] ?? null,
        'preco_dia' => $input['preco_dia'] ?? null,
    ]);

    if (!($resultado['ok'] ?? false)) {
        http_response_code((int) ($resultado['status'] ?? 500));
        echo json_encode([
            'status'  => 'erro',
            'erro'    => $resultado['erro'] ?? 'falha',
            'mensagem' => $resultado['mensagem'] ?? 'Nao foi possivel realizar o cadastro.',
        ]);
        return;
    }

    http_response_code((int) ($resultado['status'] ?? 201));
    echo json_encode(['status' => 'ok', 'dados' => ['usuario' => $resultado['usuario']]]);
}

function api_auth_logout(): void
{
    Auth::logout();
    echo json_encode(['status' => 'ok', 'dados' => ['mensagem' => 'Logout realizado com sucesso.']]);
}

function api_auth_me(): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'Não autenticado.']);
        return;
    }

    http_response_code(200);
    echo json_encode(['status' => 'ok', 'dados' => ['usuario' => $usuario]]);
}

function api_auth_forgotPassword(array $input): void
{
    $email = trim(strtolower((string) ($input['email'] ?? '')));

    if ($email === '') {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'Informe um e-mail valido.']);
        return;
    }

    $resultado = Auth::solicitarRecuperacao($email);

    http_response_code((int) ($resultado['status'] ?? 200));
    echo json_encode([
        'status'  => $resultado['ok'] ? 'ok' : 'erro',
        'dados'   => ['mensagem' => $resultado['mensagem']],
        'reset_token' => $resultado['reset_token'] ?? null,
    ]);
}

function api_auth_resetPassword(array $input): void
{
    $token = (string) ($input['token'] ?? '');
    $senha = (string) ($input['senha'] ?? '');

    $resultado = Auth::redefinirSenha($token, $senha);

    http_response_code((int) ($resultado['status'] ?? 500));
    echo json_encode([
        'status'  => $resultado['ok'] ? 'ok' : 'erro',
        'erro'    => $resultado['ok'] ? null : ($resultado['erro'] ?? 'falha'),
        'mensagem' => $resultado['ok'] ? null : ($resultado['mensagem'] ?? 'Nao foi possivel redefinir a senha.'),
    ]);
}
