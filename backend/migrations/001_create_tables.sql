-- ============================================================
-- TechFix — Backend PHP (Fase 1)
-- Migration 001: Criação das tabelas iniciais
-- ============================================================

CREATE DATABASE IF NOT EXISTS techfix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techfix;

CREATE TABLE IF NOT EXISTS usuarios (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(120) NOT NULL,
    email         VARCHAR(160) NOT NULL UNIQUE,
    senha_hash   VARCHAR(255) NOT NULL,
    tipo         ENUM('cliente', 'profissional') NOT NULL DEFAULT 'cliente',
    telefone     VARCHAR(30) NULL,
    avatar_url   VARCHAR(255) NULL,
    bio          TEXT NULL,
    educacao     TEXT NULL,
    profissao    VARCHAR(120) NULL,
    preco_dia    DECIMAL(10,2) NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    reset_token  VARCHAR(120) NULL,
    reset_expires DATETIME NULL,
    KEY idx_usuarios_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS servicos (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT UNSIGNED NOT NULL,
    titulo           VARCHAR(160) NOT NULL,
    descricao        TEXT NOT NULL,
    categoria_slug  VARCHAR(60) NOT NULL,
    preco            DECIMAL(10,2) NOT NULL,
    duracao_min      INT UNSIGNED NOT NULL DEFAULT 60,
    ativo            TINYINT(1) NOT NULL DEFAULT 1,
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_servicos_profissional
        FOREIGN KEY (profissional_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    KEY idx_servicos_profissional (profissional_id),
    KEY idx_servicos_categoria (categoria_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS agendamentos (
    id                 INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero_pedido     VARCHAR(60) NOT NULL UNIQUE,
    cliente_id        INT UNSIGNED NOT NULL,
    cliente_nome      VARCHAR(120) NOT NULL,
    profissional_id   INT UNSIGNED NOT NULL,
    profissional_nome VARCHAR(120) NOT NULL,
    servico_id        INT UNSIGNED NULL,
    servico_titulo    VARCHAR(160) NULL,
    datas             JSON NOT NULL,
    metodo_pagamento  ENUM('pix', 'cartao') NULL,
    subtotal          DECIMAL(10,2) NOT NULL DEFAULT 0,
    taxa_servico      DECIMAL(10,2) NOT NULL DEFAULT 0,
    valor_total       DECIMAL(10,2) NOT NULL DEFAULT 0,
    status            ENUM('solicitado', 'aceito', 'recusado', 'em_andamento', 'concluido', 'cancelado') NOT NULL DEFAULT 'solicitado',
    criado_em         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ag_profissional
        FOREIGN KEY (profissional_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_ag_cliente
        FOREIGN KEY (cliente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_ag_servico
        FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE SET NULL,
    KEY idx_ag_cliente (cliente_id),
    KEY idx_ag_profissional (profissional_id),
    KEY idx_ag_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS avaliacoes (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT UNSIGNED NOT NULL,
    cliente_id       INT UNSIGNED NOT NULL,
    nota            TINYINT UNSIGNED NOT NULL,
    comentario      TEXT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_aval_profissional
        FOREIGN KEY (profissional_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_aval_cliente
        FOREIGN KEY (cliente_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contatos (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(120) NOT NULL,
    email       VARCHAR(160) NOT NULL,
    telefone   VARCHAR(30) NULL,
    mensagem   TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
