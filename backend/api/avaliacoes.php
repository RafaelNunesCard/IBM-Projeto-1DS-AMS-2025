<?php
/**
 * TechFix — API de Avaliações (Fase 3)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../src/Auth.php';

function api_criarAvaliacao(): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'É necessário estar autenticado.']);
        return;
    }

    if ((string) $usuario['tipo'] !== 'cliente') {
        http_response_code(403);
        echo json_encode(['status' => 'erro', 'erro' => 'forbidden', 'mensagem' => 'Apenas clientes podem avaliar profissionais.']);
        return;
    }

    $input = json_decode((string) file_get_contents('php://input'), true) ?? [];

    $profissionalId = (int) ($input['profissional_id'] ?? 0);
    $nota = (int) ($input['nota'] ?? 0);
    $comentario = $input['comentario'] ?? null;

    if ($profissionalId <= 0) {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'Profissional e obrigatorios.']);
        return;
    }

    if ($nota < 1 || $nota > 5) {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'A nota deve ser entre 1 e 5.']);
        return;
    }

    $pdo = Database::getInstance();

    $stmt = $pdo->prepare(
        'INSERT INTO avaliacoes (profissional_id, cliente_id, nota, comentario, created_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)'
    );
    $stmt->execute([
        $profissionalId,
        (int) $usuario['id'],
        $nota,
        $comentario !== null && (string) $comentario !== '' ? (string) $comentario : null,
    ]);

    $avaliacaoId = (int) $pdo->lastInsertId();

    $stmt = $pdo->prepare('SELECT * FROM avaliacoes WHERE id = ? LIMIT 1');
    $stmt->execute([$avaliacaoId]);
    $avaliacao = $stmt->fetch();

    http_response_code(201);
    echo json_encode([
        'status' => 'ok',
        'dados'  => ['avaliacao' => [
            'id'              => (int) $avaliacao['id'],
            'profissional_id' => (int) $avaliacao['profissional_id'],
            'cliente_id'      => (int) $avaliacao['cliente_id'],
            'nota'            => (int) $avaliacao['nota'],
            'comentario'      => $avaliacao['comentario'],
            'created_at'      => (string) $avaliacao['created_at'],
        ]],
    ]);
}
