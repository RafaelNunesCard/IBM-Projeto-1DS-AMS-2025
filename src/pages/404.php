<?php
$titulo = 'TechFix - Página não encontrada';
$css = ['../../assets/css/404.css'];
$js = [];
$paginaAtual = '';
require __DIR__ . '/../partials/header.php';
?>
    <main class="nao_encontrado">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>

      <span class="badge">
        <i class="ri-error-warning-line"></i>
        Página não encontrada
      </span>

      <div class="codigo">404</div>

      <h1>Ops! Este profissional saiu para um chamado.</h1>
      <p>
        A página que você procura não existe, foi movida ou o link está
        incorreto. Volte para o início ou encontre outro profissional na nossa
        lista de serviços.
      </p>

      <div class="acoes">
        <a href="home.php"><button class="btn">VOLTAR AO INÍCIO</button></a>
        <a href="servico.php" class="btn-ghost">
          VER SERVIÇOS <i class="ri-arrow-right-line"></i>
        </a>
      </div>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
