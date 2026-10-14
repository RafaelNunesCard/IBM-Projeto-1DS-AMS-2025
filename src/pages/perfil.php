<?php
$titulo = 'TechFix - Perfil';
$css = ['../../assets/css/perfil.css'];
$js = ['../../assets/js/perfil.js'];
$paginaAtual = 'perfil';
require __DIR__ . '/../partials/header.php';
?>
    <main>
      <!--==================== Identidade ====================-->
      <section class="perfil-hero">
        <div class="perfil-hero__interno">
          <div class="perfil-avatar">
            <div class="perfil-avatar__moldura">
              <img
                class="perfil-avatar__img"
                id="perfil_avatar"
                src="../../assets/img/Perfis/Default perfil.jpg"
                alt="Foto do usuário"
              />
            </div>
            <span class="perfil-avatar__badge" id="status_badge" hidden>
              <i class="ri-emotion-line"></i>
              <span id="status_badge_texto"></span>
            </span>
            <button
              type="button"
              class="perfil-avatar__botao"
              id="bnt_status"
              aria-haspopup="dialog"
              aria-label="Editar status do perfil"
            >
              <i class="ri-emotion-line"></i>
            </button>
          </div>

          <h1 id="perfil_nome">Usuário</h1>

          <p class="perfil-hero__meta">
            <span class="perfil-tag" id="perfil_profissao">Cliente</span>
            <span class="perfil-tag perfil-tag--suave" id="perfil_pronome"></span>
          </p>

          <div class="perfil-aviso" id="perfil_aviso" hidden>
            <i class="ri-information-line"></i>
            <p>
              Você ainda não tem um perfil salvo.
              <a href="editar.php">Complete seus dados</a> ou
              <a href="cadastro.php">entre na sua conta</a>.
            </p>
          </div>

          <ul class="perfil-contato">
            <li>
              <i class="ri-map-pin-line"></i>
              <span id="perfil_local">Local não informado</span>
            </li>
            <li>
              <i class="ri-mail-line"></i>
              <a id="perfil_email">E-mail não informado</a>
            </li>
            <li>
              <i class="ri-phone-line"></i>
              <a id="perfil_telefone">Telefone não informado</a>
            </li>
          </ul>

          <div class="perfil-acoes">
            <a href="editar.php" class="btn btn-primario" id="bnt_editar">
              <i class="ri-edit-fill"></i> Editar perfil
            </a>
          </div>

          <div class="perfil-stats">
            <div class="perfil-stat">
              <strong id="stat_agendamentos">0</strong>
              <span>Agendamentos</span>
            </div>
            <div class="perfil-stat">
              <strong id="stat_avaliacoes">0</strong>
              <span>Avaliações</span>
            </div>
          </div>
        </div>
      </section>

      <!--==================== Sobre ====================-->
      <section class="perfil-conteudo">
        <article class="perfil-card">
          <h2>
            <span class="perfil-card__icone"><i class="ri-user-fill"></i></span>
            Biografia
          </h2>
          <p id="perfil_biografia">Você ainda não adicionou uma biografia.</p>
        </article>

        <article class="perfil-card">
          <h2>
            <span class="perfil-card__icone"
              ><i class="ri-book-marked-fill"></i
            ></span>
            Educação
          </h2>
          <p id="perfil_educacao">
            Você ainda não adicionou informações de educação.
          </p>
        </article>
      </section>
    </main>

    <!--==================== Popup de status ====================-->
    <div class="status-overlay" id="status_overlay" hidden></div>

    <div
      class="status-popup"
      id="status_popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="status_titulo"
      hidden
    >
      <h2 id="status_titulo">Editar status</h2>
      <p>
        Mostre aos outros usuários como você está agora e por quanto tempo esse
        status deve aparecer.
      </p>

      <div class="campo">
        <label for="status_categoria">Como você está?</label>
        <select id="status_categoria">
          <option value="vacation">Estou de férias</option>
          <option value="sick">Estou doente</option>
          <option value="focusing">Estou focado</option>
          <option value="grief">Estou de luto</option>
        </select>
      </div>

      <div class="campo">
        <label for="status_duracao">Por quanto tempo?</label>
        <select id="status_duracao">
          <option value="hour">Uma hora</option>
          <option value="day">Um dia</option>
          <option value="week">Uma semana</option>
          <option value="month">Um mês</option>
        </select>
      </div>

      <div class="status-popup__acoes">
        <button type="button" class="btn btn-primario" id="status_aplicar">
          Aplicar status
        </button>
        <button type="button" class="btn btn-secundario" id="status_cancelar">
          Cancelar
        </button>
      </div>
      <button type="button" class="status-popup__remover" id="status_remover" hidden>
        Remover status
      </button>
    </div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
