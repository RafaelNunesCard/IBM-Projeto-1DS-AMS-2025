<?php
/**
 * TechFix — API de Servicos (Fase 3)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

function api_listarServicos(): void
{
    $pdo = Database::getInstance();

    $stmt = $pdo->query(
        'SELECT s.id, s.profissional_id, s.titulo, s.descricao, s.categoria_slug, s.preco, s.duracao_min, s.ativo,
                u.nome AS profissional_nome
         FROM servicos s
         INNER JOIN usuarios u
             ON u.id = s.profissional_id AND u.tipo = \'profissional\'
         WHERE s.ativo = 1
         ORDER BY s.id'
    );

    $servicos = [];
    foreach ($stmt->fetchAll() as $row) {
        $servicos[] = [
            'id'             => (int) $row['id'],
            'profissional_id' => (int) $row['profissional_id'],
            'titulo'         => (string) $row['titulo'],
            'descricao'      => (string) $row['descricao'],
            'categoria_slug' => (string) $row['categoria_slug'],
            'preco'          => (float) $row['preco'],
            'duracao_min'    => (int) $row['duracao_min'],
            'ativo'          => (bool) $row['ativo'],
            'profissional_nome' => (string) $row['profissional_nome'],
        ];
    }

    http_response_code(200);
    echo json_encode(['status' => 'ok', 'dados' => ['servicos' => $servicos]]);
}
