<?php
/**
 * TechFix — Serviço de e-mail via SMTP (Fase 5)
 */

declare(strict_types=1);

final class Mail
{
    public static function enviar(string $destinatario, string $assunto, string $corpo): bool
    {
        $host = (string) (getenv('SMTP_HOST') ?: 'localhost');
        $port = (int) (getenv('SMTP_PORT') ?: 587);
        $user = (string) (getenv('SMTP_USER') ?: '');
        $pass = (string) (getenv('SMTP_PASS') ?: '');
        $from = (string) (getenv('SMTP_FROM') ?: 'no-reply@techfix.com');
        $timeout = 10;

        $errno = 0;
        $errstr = '';
        $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
        if ($socket === false) {
            return false;
        }

        try {
            self::escrever($socket, "EHLO techfix.local\r\n");
            self::aguardarResposta($socket);

            if ($user !== '') {
                self::escrever($socket, "AUTH LOGIN\r\n");
                self::aguardarResposta($socket);
                self::escrever($socket, base64_encode($user) . "\r\n");
                self::aguardarResposta($socket);
                self::escrever($socket, base64_encode($pass) . "\r\n");
                self::aguardarResposta($socket);
            }

            self::escrever($socket, 'MAIL FROM:<' . $from . ">\r\n");
            self::escrever($socket, 'RCPT TO:<' . $destinatario . ">\r\n");
            self::escrever($socket, "DATA\r\n");
            self::escrever($socket, self::montarMensagem($from, $destinatario, $assunto, $corpo) . "\r\n");
            self::aguardarResposta($socket);

            return true;
        } finally {
            fclose($socket);
        }
    }

    private static function montarMensagem(string $from, string $to, string $subject, string $body): string
    {
        return "From: {$from}\r\n" .
               "To: {$to}\r\n" .
               'Subject: =?UTF-8?B?' . base64_encode($subject) . "?\r\n" .
               "MIME-Version: 1.0\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n\r\n" .
               $body . "\r\n.";
    }

    private static function escrever($socket, string $dados): void
    {
        fwrite($socket, $dados);
    }

    private static function aguardarResposta($socket): array
    {
        $respostas = [];
        $linha = '';
        while (true) {
            $linha = fgets($socket);
            if ($linha === false) {
                break;
            }
            $linha = trim($linha);
            if ($linha === '') {
                break;
            }
            $respostas[] = $linha;
        }
        return $respostas;
    }
}
