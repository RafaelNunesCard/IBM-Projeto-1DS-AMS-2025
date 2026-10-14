<?php
$titulo = 'TechFix - Serviços';
$css = ['../../assets/css/servico.css'];
$js = [];
$jsRodape = ['../../assets/js/profissionais.js', '../../assets/js/servico.js'];
$paginaAtual = 'servicos';
require __DIR__ . '/../partials/header.php';
?>
    <main>
      <section id="banner">
        <span class="hero-glow g1"></span>
        <span class="hero-glow g2"></span>
        <span class="hero-badge"
          ><i class="ri-shield-check-fill"></i> Profissionais verificados</span
        >
        <h1>Encontre o <span class="grad">serviço ideal</span> para você</h1>
        <p>
          Especialistas qualificados na sua região: manutenção predial, TI,
          eletrodomésticos, veículos e equipamentos industriais.
        </p>
      </section>

      <section id="tipos">
        <div class="tipos" data-categoria="predial">
          <div class="i"><i class="ri-home-9-fill"></i></div>
          <span class="tipos__titulo">Manutenção predial</span>
        </div>
        <div class="tipos" data-categoria="informatica">
          <div class="i"><i class="ri-bug-fill"></i></div>
          <span class="tipos__titulo">Serviços de TI</span>
        </div>
        <div class="tipos" data-categoria="eletro">
          <div class="i"><i class="ri-computer-fill"></i></div>
          <span class="tipos__titulo">Reparo de Eletrodomésticos</span>
        </div>
        <div class="tipos" data-categoria="veiculos">
          <div class="i"><i class="ri-roadster-fill"></i></div>
          <span class="tipos__titulo">Manutenção de Veículos</span>
        </div>
        <div class="tipos" data-categoria="industriais">
          <div class="i"><i class="ri-server-fill"></i></div>
          <span class="tipos__titulo">Manutenção de Equipamentos Industriais</span>
        </div>
        <div class="tipos ativo" data-categoria="todos">
          <div class="i"><i class="ri-grid-fill"></i></div>
          <span class="tipos__titulo">Todos</span>
        </div>
      </section>

      <section id="clts">
        <div class="clts_topo">
          <div>
            <h2 id="titulo_clt">Profissionais na sua região</h2>
            <p id="contador_resultados">Carregando profissionais...</p>
          </div>
          <div class="search">
            <i class="ri-search-2-line"></i>
            <input id="search" type="text" placeholder="Buscar pelo nome do profissional">
          </div>
        </div>
        <div id="lista_profissionais">
          <p class="lista_carregando"><i class="ri-loader-4-line"></i> Carregando profissionais...</p>
        </div>

        <div class="empty-state" id="sem_resultados" hidden>
          <i class="ri-user-search-line"></i>
          <h2>Nenhum profissional encontrado</h2>
          <p>
            Tente buscar por outro nome ou selecione uma categoria diferente.
          </p>
          <button class="btn" id="limpar_filtros">LIMPAR FILTROS</button>
        </div>
      </section>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
