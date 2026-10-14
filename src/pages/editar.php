<?php
$titulo = 'TechFix - Editar Perfil';
$css = ['../../assets/css/editar.css'];
$js = ['../../assets/js/editar.js'];
$paginaAtual = 'perfil';
require __DIR__ . '/../partials/header.php';
?>
    <main>
      <section class="editar-hero">
        <div class="editar-hero__interno">
          <span class="editar-badge">
            <i class="ri-user-settings-line"></i> Minha conta
          </span>
          <h1>Editar perfil</h1>
          <p>
            Mantenha seus dados atualizados para que clientes e profissionais
            possam falar com você sem dificuldade.
          </p>
          <a href="perfil.php" class="editar-voltar">
            <i class="ri-arrow-left-line"></i> Voltar ao perfil
          </a>
        </div>
      </section>

      <section class="editar-container">
        <form class="editar-card" id="form-editar" novalidate>
          <div class="editar-foto">
            <label for="avatar">Foto de perfil</label>
            <img
              id="preview"
              src="../../assets/img/Perfis/Default perfil.jpg"
              alt="Prévia da foto de perfil"
            />
            <label for="avatar" class="btn btn-secundario editar-foto__botao">
              <i class="ri-image-add-line"></i> Escolher imagem
            </label>
            <input type="file" id="avatar" accept="image/*" />
            <p class="editar-dica">JPG ou PNG, de preferência quadrada.</p>
          </div>

          <div class="editar-campos">
            <div class="campo">
              <label for="nome">Nome</label>
              <input
                type="text"
                id="nome"
                required
                placeholder="Ex: Pedro Henrique Giovanelli"
              />
              <span class="campo-erro" id="erro_nome"></span>
            </div>

            <div class="linha-campos">
              <div class="campo">
                <label for="pronome">Pronomes</label>
                <input type="text" id="pronome" placeholder="Ex: Ele/Dele" />
              </div>
              <div class="campo">
                <label for="profissao">Profissão</label>
                <input
                  type="text"
                  id="profissao"
                  placeholder="Ex: Cliente ou Técnico"
                />
              </div>
            </div>

            <div class="campo">
              <label for="local">Localização</label>
              <input type="text" id="local" placeholder="Ex: São Paulo-SP" />
            </div>

            <div class="linha-campos">
              <div class="campo">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="voce@email.com" />
                <span class="campo-erro" id="erro_email"></span>
              </div>
              <div class="campo">
                <label for="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  placeholder="Ex: (11) 99999-9999"
                />
                <span class="campo-erro" id="erro_telefone"></span>
              </div>
            </div>

            <div class="campo">
              <label for="biografia">Biografia</label>
              <textarea
                id="biografia"
                maxlength="500"
                placeholder="Um resumo sobre você (máx. 500 caracteres)"
              ></textarea>
            </div>

            <div class="campo">
              <label for="educacao">Educação</label>
              <textarea
                id="educacao"
                maxlength="500"
                placeholder="Ex: Universidade de São Paulo - Administração"
              ></textarea>
            </div>

            <p class="form-aviso" id="form_aviso" role="status" hidden></p>

            <div class="botoes">
              <button type="submit" class="btn btn-primario">
                <i class="ri-check-line"></i> Salvar alterações
              </button>
              <a href="perfil.php" class="btn btn-secundario">
                <i class="ri-close-line"></i> Cancelar
              </a>
            </div>
          </div>
        </form>
      </section>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
