# TechFix Backend (PHP)

API REST do site TechFix — manutenção e reparo.

## Requisitos

- PHP 8+
- MySQL / MariaDB
- (Opcional) Apache com mod_rewrite ou uso do servidor embutido

## Instalação

1. Importar o schema:

```bash
mysql -u root -p < backend/migrations/001_create_tables.sql
```

2. Subir o servidor:

```bash
# Servidor embutido (desenvolvimento)
php -S localhost:8000 backend/index.php

# Apache (com DocumentRoot na raiz do projeto)
# backend/.htaccess redireciona /api/* -> backend/index.php
```

3. Verificar saúde da API:

```bash
curl http://localhost:8000/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "app": "TechFix API",
  "time": "2026-10-26T18:00:00+00:00"
}
```

## Endpoints implementados

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/health` | Health check | - |
| POST | `/api/auth/register` | Cadastro (cliente/profissional) | - |
| POST | `/api/auth/login` | Login | - |
| POST | `/api/auth/logout` | Logout | Sim |
| POST | `/api/auth/forgot-password` | Solicitar recuperação de senha | - |
| POST | `/api/auth/reset-password` | Redefinir senha (token + senha) | - |
| GET | `/api/profissionais` | Listar profissionais | - |
| GET | `/api/profissionais/{id}` | Detalhe do profissional | - |
| GET | `/api/servicos` | Listar serviços | - |
| POST | `/api/agendamentos` | Criar agendamento | Cliente |
| GET | `/api/agendamentos` | Listar agendamentos do usuário logado | Sim |
| GET | `/api/agendamentos/profissional` | Listar agendamentos recebidos | Profissional |
| POST | `/api/agendamentos/{id}/acao` | Atualizar status (aceito/recusado/...) | Profissional |
| POST | `/api/avaliacoes` | Criar avaliação | Cliente |
| POST | `/api/contato` | Enviar mensagem de contato | - |

## Exemplo: criar agendamento

```bash
curl -X POST http://localhost:8000/api/agendamentos \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "profissional_id": 1,
    "servico_id": 1,
    "servico_titulo": "Instalacao e manutencao eletrica",
    "datas": ["2026-11-10"],
    "metodo_pagamento": "pix",
    "subtotal": 150.00,
    "taxa_servico": 30.00,
    "valor_total": 180.00
  }'
```


## Estrutura

```
backend/
├── index.php              # Front controller / router (/api/*)
├── .htaccess              # Rewrite Apache para /api/*
├── config/
│   └── database.php       # Conexão PDO (MySQL)
├── api/                    # Endpoints (adicionar em fases seguintes)
├── src/                    # Classes de dominio/services (futuro)
└── migrations/
    └── 001_create_tables.sql
└── seed/
    └── 001_seed.sql
```
