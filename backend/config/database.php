<?php
/**
 * TechFix — Configuração de conexão com o banco (MySQL/MariaDB)
 *
 * Em desenvolvimento, as variáveis podem ser definidas via .env
 * ou variáveis de ambiente. Fallbacks usados para o MVP local.
 */

declare(strict_types=1);

final class Database
{
    private static ?PDO $pdo = null;

    public static function getInstance(): PDO
    {
        if (self::$pdo instanceof PDO) {
            return self::$pdo;
        }

        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            (string) (getenv('DB_HOST') ?: '127.0.0.1'),
            (string) (getenv('DB_NAME') ?: 'techfix'),
            (string) (getenv('DB_CHARSET') ?: 'utf8mb4')
        );

        $user = getenv('DB_USER') ?: 'root';
        $pass = getenv('DB_PASS') ?: '';

        $pdo = new PDO(
            $dsn,
            $user,
            $pass,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]
        );

        return self::$pdo = $pdo;
    }

    private function __construct() {}
}
