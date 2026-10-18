<?php
/**
 * TechFix — API de Agendamentos (Fase 3)
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../src/Auth.php';
require_once __DIR__ . '/../src/Agendamentos.php';

function api_criarAgendamento(): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'É necessário estar autenticado.']);
        return;
    }

    if ((string) $usuario['tipo'] !== 'cliente') {
        http_response_code(403);
        echo json_encode(['status' => 'erro', 'erro' => 'forbidden', 'mensagem' => 'Apenas clientes podem criar agendamentos.']);
        return;
    }

    $input = json_decode((string) file_get_contents('php://input'), true) ?? [];

    $resultado = Agendamentos::criar(
        $input,
        (int) $usuario['id'],
        (string) $usuario['nome']
    );

    http_response_code((int) ($resultado['status'] ?? 500));
    echo json_encode([
        'status'  => $resultado['ok'] ? 'ok' : 'erro',
        'erro'    => $resultado['ok'] ? null : ($resultado['erro'] ?? 'falha'),
        'mensagem' => $resultado['ok'] ? null : ($resultado['mensagem'] ?? 'Não foi possível criar o agendamento.'),
        'dados'   => $resultado['ok'] ? ['agendamento' => $resultado['agendamento']] : [],
    ]);
}

function api_listarAgendamentos(): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'É necessário estar autenticado.']);
        return;
    }

    $tipo = (string) $usuario['tipo'];

    if ($tipo === 'cliente') {
        $resultado = Agendamentos::listarPorCliente((int) $usuario['id']);
    } else {
        $resultado = Agendamentos::listarPorProfissional((int) $usuario['id']);
    }

    http_response_code((int) ($resultado['status'] ?? 500));
    echo json_encode([
        'status' => $resultado['ok'] ? 'ok' : 'erro',
        'dados'  => $resultado['ok'] ? ['agendamentos' => $resultado['agendamentos']] : ['agendamentos' => []],
    ]);
}

function api_listarAgendamentosProfissional(): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'É necessário estar autenticado.']);
        return;
    }

    if ((string) $usuario['tipo'] !== 'profissional') {
        http_response_code(403);
        echo json_encode(['status' => 'erro', 'erro' => 'forbidden', 'mensagem' => 'Apenas profissionais podem listar agendamentos recebidos.']);
        return;
    }

    $resultado = Agendamentos::listarPorProfissional((int) $usuario['id']);

    http_response_code((int) ($resultado['status'] ?? 500));
    echo json_encode([
        'status' => $resultado['ok'] ? 'ok' : 'erro',
        'dados'  => $resultado['ok'] ? ['agendamentos' => $resultado['agendamentos']] : ['agendamentos' => []],
    ]);
}

function api_atualizarStatus(int $id): void
{
    $usuario = Auth::usuarioLogado();

    if ($usuario === null) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'erro' => 'nao_autenticado', 'mensagem' => 'É necessário estar autenticado.']);
        return;
    }

    if ((string) $usuario['tipo'] !== 'profissional') {
        http_response_code(403);
        echo json_encode(['status' => 'erro', 'erro' => 'forbidden', 'mensagem' => 'Apenas profissionais podem atualizar o status de um agendamento.']);
        return;
    }

    $input = json_decode((string) file_get_contents('php://input'), true) ?? [];
    $status = (string) ($input['status'] ?? '');

    $resultado = Agendamentos::atualizarStatus($id, (int) $usuario['id'], $status);

    http_response_code((int) ($resultado['status'] ?? 500));
    echo json_encode([
        'status'  => $resultado['ok'] ? 'ok' : 'erro',
        'erro'    => $resultado['ok'] ? null : ($resultado['erro'] ?? 'falha'),
        'mensagem' => $resultado['ok'] ? null : ($resultado['mensagem'] ?? 'Não foi possível atualizar o agendamento.'),
        'dados'   => $resultado['ok'] ? ['agendamento' => $resultado['agendamento']] : [],
    ]);
}
