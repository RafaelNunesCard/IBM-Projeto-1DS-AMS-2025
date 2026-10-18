<?php
/**
 * TechFix — API de Profissionais (Fase 3)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

function api_listarProfissionais(): void
{
    $pdo = Database::getInstance();

    $stmt = $pdo->query(
        'SELECT u.id, u.nome, u.email, u.telefone, u.avatar_url, u.bio, u.educacao, u.profissao, u.preco_dia,
                s.id AS servico_id, s.titulo AS servico_titulo, s.descricao AS servico_descricao,
                s.categoria_slug AS servico_categoria, s.preco AS servico_preco, s.duracao_min AS servico_duracao
         FROM servicos s
         INNER JOIN usuarios u
             ON u.id = s.profissional_id AND u.tipo = \'profissional\'
         WHERE s.ativo = 1
         ORDER BY u.id, s.id'
    );

    $profissionais = [];
    foreach ($stmt->fetchAll() as $row) {
        $id = (int) $row['id'];

        if (!isset($profissionais[$id])) {
            $profissionais[$id] = [
                'id'          => $id,
                'nome'        => (string) $row['nome'],
                'email'       => (string) $row['email'],
                'telefone'    => $row['telefone'],
                'avatar_url'  => $row['avatar_url'],
                'bio'         => $row['bio'],
                'educacao'   => $row['educacao'],
                'profissao'   => $row['profissao'],
                'preco_dia'   => $row['preco_dia'] !== null ? (float) $row['preco_dia'] : null,
                'servicos'    => [],
            ];
        }

        $profissionais[$id]['servicos'][] = [
            'id'            => (int) $row['servico_id'],
            'titulo'        => (string) $row['servico_titulo'],
            'descricao'     => (string) $row['servico_descricao'],
            'categoria_slug' => (string) $row['servico_categoria'],
            'preco'         => (float) $row['servico_preco'],
            'duracao_min'   => (int) $row['servico_duracao'],
        ];
    }

    http_response_code(200);
    echo json_encode(['status' => 'ok', 'dados' => ['profissionais' => array_values($profissionais)]]);
}

function api_buscarProfissional(int $id): void
{
    $pdo = Database::getInstance();

    $stmt = $pdo->prepare(
        'SELECT u.id, u.nome, u.email, u.telefone, u.avatar_url, u.bio, u.educacao, u.profissao, u.preco_dia
         FROM usuarios u
         WHERE u.id = ? AND u.tipo = \'profissional\' LIMIT 1'
    );
    $stmt->execute([$id]);
    $profissional = $stmt->fetch();

    if ($profissional === false) {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'erro' => 'profissional_nao_encontrado', 'mensagem' => 'Profissional nao encontrado.']);
        return;
    }

    $stmt = $pdo->prepare(
        'SELECT id, titulo, descricao, categoria_slug, preco, duracao_min
         FROM servicos
         WHERE profissional_id = ? AND ativo = 1
         ORDER BY id'
    );
    $stmt->execute([$id]);
    $servicos = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'dados'  => [
            'profissional' => [
                'id'          => (int) $profissional['id'],
                'nome'        => (string) $profissional['nome'],
                'email'       => (string) $profissional['email'],
                'telefone'    => $profissional['telefone'],
                'avatar_url'  => $profissional['avatar_url'],
                'bio'         => $profissional['bio'],
                'educacao'   => $profissional['educacao'],
                'profissao'   => $profissional['profissao'],
                'preco_dia'   => $profissional['preco_dia'] !== null ? (float) $profissional['preco_dia'] : null,
            ],
            'servicos' => $servicos,
        ],
    ]);
}
