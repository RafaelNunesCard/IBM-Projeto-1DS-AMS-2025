<?php
/**
 * TechFix — Logica de Agendamentos (Fase 3)
 */

declare(strict_types=1);

final class Agendamentos
{
    private const STATUS_VALIDOS = [
        'solicitado',
        'aceito',
        'recusado',
        'em_andamento',
        'concluido',
        'cancelado',
    ];

    public static function criar(array $input, int $clienteId, string $clienteNome): array
    {
        $profissionalId = (int) ($input['profissional_id'] ?? 0);
        $servicoId = (int) ($input['servico_id'] ?? 0);
        $servicoTitulo = $input['servico_titulo'] ?? null;
        $datas = $input['datas'] ?? [];
        $metodoPagamento = $input['metodo_pagamento'] ?? 'pix';
        $subtotal = (float) ($input['subtotal'] ?? 0);
        $taxaServico = (float) ($input['taxa_servico'] ?? 0);
        $valorTotal = (float) ($input['valor_total'] ?? 0);

        if ($profissionalId <= 0) {
            return ['ok' => false, 'status' => 422, 'erro' => 'validacao', 'mensagem' => 'Profissional e obrigatorios.'];
        }

        if (!is_array($datas) || empty($datas)) {
            return ['ok' => false, 'status' => 422, 'erro' => 'validacao', 'mensagem' => 'Informe ao menos uma data.'];
        }

        $datasValidas = [];
        foreach ($datas as $data) {
            $data = trim((string) $data);
            if ($data !== '' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $data)) {
                $datasValidas[] = $data;
            }
        }

        if (empty($datasValidas)) {
            return ['ok' => false, 'status' => 422, 'erro' => 'validacao', 'mensagem' => 'Informe datas validas no formato AAAA-MM-DD.'];
        }

        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT id, nome, preco_dia FROM usuarios WHERE id = ? AND tipo = \'profissional\' LIMIT 1');
        $stmt->execute([$profissionalId]);
        $profissional = $stmt->fetch();

        if ($profissional === false) {
            return ['ok' => false, 'status' => 404, 'erro' => 'profissional_nao_encontrado', 'mensagem' => 'Profissional nao encontrado.'];
        }

        $numeroPedido = 'TF-' . date('Ymd') . '-' . strtoupper(substr(md5((string) random_int(1, PHP_INT_MAX)), 0, 8));
        $stmt = $pdo->prepare(
            'INSERT INTO agendamentos
                (numero_pedido, cliente_id, cliente_nome, profissional_id, profissional_nome, servico_id, servico_titulo, datas, metodo_pagamento, subtotal, taxa_servico, valor_total, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );

        $stmt->execute([
            $numeroPedido,
            $clienteId,
            $clienteNome,
            $profissionalId,
            (string) $profissional['nome'],
            $servicoId > 0 ? $servicoId : null,
            ($servicoTitulo !== null && (string) $servicoTitulo !== '') ? (string) $servicoTitulo : null,
            json_encode($datasValidas),
            $metodoPagamento,
            $subtotal,
            $taxaServico,
            $valorTotal,
            'solicitado',
        ]);

        $agendamentoId = (int) $pdo->lastInsertId();
        $agendamento = self::buscarPorId($agendamentoId);

        return ['ok' => true, 'status' => 201, 'agendamento' => $agendamento];
    }

    public static function listarPorCliente(int $clienteId): array
    {
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT * FROM agendamentos WHERE cliente_id = ? ORDER BY criado_em DESC');
        $stmt->execute([$clienteId]);
        $agendamentos = array_map(static fn (array $row) => self::formatar($row), $stmt->fetchAll());

        return ['ok' => true, 'status' => 200, 'agendamentos' => $agendamentos];
    }

    public static function listarPorProfissional(int $profissionalId): array
    {
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT * FROM agendamentos WHERE profissional_id = ? ORDER BY criado_em DESC');
        $stmt->execute([$profissionalId]);
        $agendamentos = array_map(static fn (array $row) => self::formatar($row), $stmt->fetchAll());

        return ['ok' => true, 'status' => 200, 'agendamentos' => $agendamentos];
    }

    public static function atualizarStatus(int $id, int $profissionalId, string $status): array
    {
        if (!in_array($status, self::STATUS_VALIDOS, true)) {
            return ['ok' => false, 'status' => 422, 'erro' => 'validacao', 'mensagem' => 'Status invalido.'];
        }

        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT * FROM agendamentos WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $agendamento = $stmt->fetch();

        if ($agendamento === false) {
            return ['ok' => false, 'status' => 404, 'erro' => 'agendamento_nao_encontrado', 'mensagem' => 'Agendamento nao encontrado.'];
        }

        if ((int) $agendamento['profissional_id'] !== $profissionalId) {
            return ['ok' => false, 'status' => 403, 'erro' => 'forbidden', 'mensagem' => 'Este agendamento nao pertence ao profissional logado.'];
        }

        $stmt = $pdo->prepare('UPDATE agendamentos SET status = ?, atualizado_em = NOW() WHERE id = ?');
        $stmt->execute([$status, $id]);

        $agendamentoAtualizado = self::buscarPorId($id);

        return ['ok' => true, 'status' => 200, 'agendamento' => $agendamentoAtualizado];
    }

    public static function buscarPorId(int $id): ?array
    {
        $pdo = Database::getInstance();

        $stmt = $pdo->prepare('SELECT * FROM agendamentos WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        return $row === false ? null : self::formatar($row);
    }

    private static function formatar(array $row): array
    {
        $datas = is_array($row['datas']) ? $row['datas'] : (json_decode((string) $row['datas'], true) ?: []);

        return [
            'id'              => (int) $row['id'],
            'numero_pedido'  => (string) $row['numero_pedido'],
            'cliente_id'      => (int) $row['cliente_id'],
            'cliente_nome'   => (string) $row['cliente_nome'],
            'profissional_id' => (int) $row['profissional_id'],
            'profissional_nome' => (string) $row['profissional_nome'],
            'servico_id'      => $row['servico_id'] !== null ? (int) $row['servico_id'] : null,
            'servico_titulo' => $row['servico_titulo'] !== null ? (string) $row['servico_titulo'] : null,
            'datas'           => $datas,
            'metodo_pagamento' => $row['metodo_pagamento'],
            'subtotal'        => (float) $row['subtotal'],
            'taxa_servico'    => (float) $row['taxa_servico'],
            'valor_total'     => (float) $row['valor_total'],
            'status'          => (string) $row['status'],
            'criado_em'       => (string) $row['criado_em'],
            'atualizado_em'   => (string) $row['atualizado_em'],
        ];
    }
}
