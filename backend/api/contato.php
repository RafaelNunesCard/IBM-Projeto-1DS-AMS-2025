<?php
/**
 * TechFix — API de Contato (Fase 3)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

function api_criarContato(): void
{
    $input = json_decode((string) file_get_contents('php://input'), true) ?? [];

    $nome = trim((string) ($input['nome'] ?? ''));
    $email = trim((string) ($input['email'] ?? ''));
    $telefone = trim((string) ($input['telefone'] ?? ''));
    $mensagem = trim((string) ($input['mensagem'] ?? ''));

    if ($nome === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $mensagem === '') {
        http_response_code(422);
        echo json_encode(['status' => 'erro', 'erro' => 'validacao', 'mensagem' => 'Nome, email valido e mensagem sao obrigatorios.']);
        return;
    }

    $pdo = Database::getInstance();

    $stmt = $pdo->prepare(
        'INSERT INTO contatos (nome, email, telefone, mensagem, created_at)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)'
    );
    $stmt->execute([$nome, $email, $telefone !== '' ? $telefone : null, $mensagem]);

    http_response_code(201);
    echo json_encode(['status' => 'ok', 'dados' => ['mensagem' => 'Mensagem enviada com sucesso.']]);
}
