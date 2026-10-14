<?php
/* =====================================================================
   TechFix — Header parcial (src/partials/header.php)
   ---------------------------------------------------------------------
   A página deve definir, antes do include:
     $titulo      (string) — título da aba
     $css         (array)  — folhas de estilo extras, relativas à página
     $js          (array)  — scripts extras (carregados com defer)
     $paginaAtual (string) — inicio | sobre | servicos | contato | perfil
     $navPerfil   (array)  — último item: ['chave'=>, 'rotulo'=>, 'href'=>]
   ===================================================================== */

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

$titulo      = $titulo      ?? 'TechFix';
$css         = $css         ?? [];
$js          = $js          ?? [];
$paginaAtual = $paginaAtual ?? '';
$navPerfil   = $navPerfil   ?? ['chave' => 'perfil', 'rotulo' => 'PERFIL', 'href' => 'perfil.php'];

$menu = [
    ['chave' => 'inicio',   'rotulo' => 'INÍCIO',    'href' => 'home.php'],
    ['chave' => 'sobre',    'rotulo' => 'SOBRE NÓS', 'href' => 'sobre.php'],
    ['chave' => 'servicos', 'rotulo' => 'SERVIÇOS',  'href' => 'servico.php'],
    ['chave' => 'contato',  'rotulo' => 'CONTATO',   'href' => 'contato.php'],
];

$escapar = static function ($valor) {
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
};
?>
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!--==================== RemixIcon ====================-->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
    />

    <!--==================== Favicon ====================-->
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon" />

    <!--==================== CSS ====================-->
    <link rel="stylesheet" href="../../assets/css/base.css" />
<?php foreach ($css as $arquivo): ?>
    <link rel="stylesheet" href="<?= $escapar($arquivo) ?>" />
<?php endforeach; ?>

    <!--==================== JS ====================-->
    <script src="../../assets/js/header.js" defer></script>
<?php foreach ($js as $arquivo): ?>
    <script src="<?= $escapar($arquivo) ?>" defer></script>
<?php endforeach; ?>

    <title><?= $escapar($titulo) ?></title>
  </head>
  <body>
    <header id="header">
      <a class="logo" href="home.php" aria-label="TechFix — página inicial">
        <span class="logo__img">
          <img src="../../assets/img/logo.png" alt="Logo TechFix" />
        </span>
        <span class="logo__nome">TechFix</span>
      </a>

      <button
        type="button"
        class="menu-toggle"
        id="menu_toggle"
        aria-expanded="false"
        aria-controls="menu_principal"
        aria-label="Abrir menu de navegação"
      >
        <span class="hamburger" aria-hidden="true"></span>
      </button>

      <nav class="menu" id="menu_principal" aria-label="Navegação principal">
        <ul>
<?php foreach ($menu as $item): ?>
          <li>
            <a href="<?= $escapar($item['href']) ?>" class="nav"<?= $item['chave'] === $paginaAtual ? ' aria-current="page"' : '' ?>><?= $escapar($item['rotulo']) ?></a>
          </li>
<?php endforeach; ?>
          <li id="btn_cadastro">
            <a href="<?= $escapar($navPerfil['href']) ?>" class="nav" id="cadastro"<?= $navPerfil['chave'] === $paginaAtual ? ' aria-current="page"' : '' ?>><?= $escapar($navPerfil['rotulo']) ?></a>
          </li>
        </ul>
      </nav>
    </header>
