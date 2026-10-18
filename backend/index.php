<?php
/**
 * TechFix — Front Controller da API
 * ------------------------------------------------------------------
 * Todas as rotas da API ficam sob o prefixo /api/* e sao despachadas
 * por este arquivo. Pode ser usado com Apache (mod_rewrite) ou com o
 * servidor embutido do PHP:
 *
 *   php -S localhost:8000 backend/index.php
 */

declare(strict_types=1);

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Permite que o servidor embutido (php -S) sirva arquivos estaticos do projeto
if (php_sapi_name() === 'cli-server') {
    $uriPath = rawurldecode($path);
    $file = dirname(__DIR__) . $uriPath;
    if ($uriPath === '/' || $uriPath === '') {
        // Raiz -> index.html do site estatico
        $file = dirname(__DIR__) . '/index.html';
    }
    if (is_file($file) && !is_dir($file)) {
        return false;
    }
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$segments = array_values(array_filter(explode('/', (string) $path), static fn ($s) => $s !== ''));

// Descarta o prefixo /api
if (($segments[0] ?? '') === 'api') {
    array_shift($segments);
}

$resource = $segments[0] ?? '';
$param = $segments[1] ?? null;
$sub = $segments[2] ?? null;

require_once __DIR__ . '/config/database.php';

// ---------------------------------------------------------------------
// Saúde da API
// ---------------------------------------------------------------------
if ($resource === 'health') {
    echo json_encode([
        'status' => 'ok',
        'app'    => 'TechFix API',
        'time'   => date('Y-m-d\TH:i:sP'),
    ]);
    exit;
}

// ---------------------------------------------------------------------
// Autenticação: /api/auth/{acao}
// ---------------------------------------------------------------------
if ($resource === 'auth') {
    $acao = (string) ($param ?? '');
    $input = json_decode((string) file_get_contents('php://input'), true) ?? [];

    require_once __DIR__ . '/api/auth.php';

    switch ($acao) {
        case 'register':
            api_auth_register($input);
            exit;
        case 'login':
            api_auth_login($input);
            exit;
        case 'logout':
            api_auth_logout();
            exit;
        case 'me':
            api_auth_me();
            exit;
        case 'forgot-password':
            api_auth_forgotPassword($input);
            exit;
        case 'reset-password':
            api_auth_resetPassword($input);
            exit;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'rota_nao_encontrada', 'rota' => $path]);
            exit;
    }
}

// ---------------------------------------------------------------------
// Profissionais: /api/profissionais[/{id}]
// ---------------------------------------------------------------------
if ($resource === 'profissionais') {
    require_once __DIR__ . '/api/profissionais.php';

    if ($method === 'GET') {
        if ($param === null) {
            api_listarProfissionais();
        } else {
            api_buscarProfissional((int) $param);
        }
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'metodo_nao_permitido', 'rota' => $path]);
    exit;
}

// ---------------------------------------------------------------------
// Serviços: /api/servicos
// ---------------------------------------------------------------------
if ($resource === 'servicos') {
    require_once __DIR__ . '/api/servicos.php';

    if ($method === 'GET') {
        api_listarServicos();
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'metodo_nao_permitido', 'rota' => $path]);
    exit;
}

// ---------------------------------------------------------------------
// Agendamentos: /api/agendamentos[...]
// ---------------------------------------------------------------------
if ($resource === 'agendamentos') {
    require_once __DIR__ . '/api/agendamentos.php';

    // GET /api/agendamentos -> lista do usuário logado (cliente ou profissional)
    if ($method === 'GET' && $param === null) {
        api_listarAgendamentos();
        exit;
    }

    // GET /api/agendamentos/profissional -> lista recebida pelo profissional logado
    if ($method === 'GET' && $param === 'profissional') {
        api_listarAgendamentosProfissional();
        exit;
    }

    // POST /api/agendamentos -> cria agendamento (cliente logado)
    if ($method === 'POST' && $param === null) {
        api_criarAgendamento();
        exit;
    }

    // POST /api/agendamentos/{id}/acao -> atualiza status (profissional logado)
    if ($method === 'POST' && $param !== null && $sub === 'acao') {
        api_atualizarStatus((int) $param);
        exit;
    }

    http_response_code(404);
    echo json_encode(['error' => 'rota_nao_encontrada', 'rota' => $path]);
    exit;
}

// ---------------------------------------------------------------------
// Avaliações: /api/avaliacoes
// ---------------------------------------------------------------------
if ($resource === 'avaliacoes') {
    require_once __DIR__ . '/api/avaliacoes.php';

    if ($method === 'POST') {
        api_criarAvaliacao();
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'metodo_nao_permitido', 'rota' => $path]);
    exit;
}

// ---------------------------------------------------------------------
// Contato: /api/contato
// ---------------------------------------------------------------------
if ($resource === 'contato') {
    require_once __DIR__ . '/api/contato.php';

    if ($method === 'POST') {
        api_criarContato();
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'metodo_nao_permitido', 'rota' => $path]);
    exit;
}

// ---------------------------------------------------------------------
// Rota não encontrada
// ---------------------------------------------------------------------
http_response_code(404);
echo json_encode(['error' => 'rota_nao_encontrada', 'rota' => $path]);
