<?php
$titulo = 'TechFix - Entrar / Cadastrar';
$css = ['../../assets/css/cadastro.css'];
$js = ['../../assets/js/cadastro.js'];
$paginaAtual = '';
$navPerfil = ['chave' => 'cadastro', 'rotulo' => 'CADASTRAR', 'href' => '#'];
require __DIR__ . '/../partials/header.php';
?>
    <main class="auth">
      <div class="container">
        <!-- ==================== ÁREA DOS FORMULÁRIOS ==================== -->
        <div class="auth-forms">
          <!-- -------- LOGIN -------- -->
          <div class="form-box login">
            <form action="">
              <div class="form-head">
                <span class="badge"
                  ><i class="ri-tools-line"></i> Área do cliente</span
                >
                <h1>Bem-vindo de volta</h1>
                <p>Acesse sua conta TechFix e cuide dos seus reparos.</p>
              </div>

              <div class="input-box">
                <i class="ri-mail-fill"></i>
                <input
                  type="text"
                  placeholder="E-mail"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="input-box">
                <i class="ri-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Senha"
                  autocomplete="current-password"
                  required
                />
                <button
                  type="button"
                  class="toggle-pass"
                  aria-label="Mostrar senha"
                >
                  <i class="ri-eye-line"></i>
                </button>
              </div>

              <div class="forgot-link">
                <a href="esqueceu.php">Esqueceu sua senha?</a>
              </div>

              <button type="button" class="btn" id="bnt-login">ENTRAR</button>

              <div class="divider"><span>ou continue com</span></div>

              <div class="social-icon">
                <a href="#" aria-label="Entrar com Google"
                  ><i class="ri-google-fill"></i
                ></a>
                <a href="#" aria-label="Entrar com Facebook"
                  ><i class="ri-facebook-circle-fill"></i
                ></a>
                <a href="#" aria-label="Entrar com LinkedIn"
                  ><i class="ri-linkedin-box-fill"></i
                ></a>
              </div>

              <p class="switch-text">
                Não tem uma conta?
                <button type="button" class="register-bnt link">
                  Cadastre-se
                </button>
              </p>
            </form>
          </div>

          <!-- -------- CADASTRO -------- -->
          <div class="form-box Cadastrar">
            <form action="">
              <div class="form-head">
                <span class="badge"
                  ><i class="ri-user-add-line"></i> Criar conta</span
                >
                <h2>Junte-se à TechFix</h2>
                <p>
                  Cadastre-se e encontre o profissional ideal para o seu reparo.
                </p>
              </div>

              <div class="input-box">
                <i class="ri-user-fill"></i>
                <input
                  type="text"
                  placeholder="Nome completo"
                  autocomplete="name"
                  required
                />
              </div>

              <div class="input-box">
                <i class="ri-mail-fill"></i>
                <input
                  type="email"
                  placeholder="E-mail"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="input-box">
                <i class="ri-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Senha"
                  autocomplete="new-password"
                  required
                />
                <button
                  type="button"
                  class="toggle-pass"
                  aria-label="Mostrar senha"
                >
                  <i class="ri-eye-line"></i>
                </button>
              </div>

              <button type="submit" class="btn" id="bnt-cadastro">
                CRIAR CONTA
              </button>

              <div class="divider"><span>ou cadastre-se com</span></div>

              <div class="social-icon">
                <a href="#" aria-label="Cadastrar com Google"
                  ><i class="ri-google-fill"></i
                ></a>
                <a href="#" aria-label="Cadastrar com Facebook"
                  ><i class="ri-facebook-circle-fill"></i
                ></a>
                <a href="#" aria-label="Cadastrar com LinkedIn"
                  ><i class="ri-linkedin-box-fill"></i
                ></a>
              </div>

              <p class="switch-text">
                Já tem uma conta?
                <button type="button" class="login-bnt link">Entrar</button>
              </p>
            </form>
          </div>
        </div>

        <!-- ==================== PAINEL DE MARCA ==================== -->
        <aside class="auth-aside">
          <span class="aside-glow"></span>
          <i class="ri-tools-fill float-icon i1"></i>
          <i class="ri-settings-5-fill float-icon i2"></i>
          <i class="ri-flashlight-fill float-icon i3"></i>

          <div class="toggle-box">
            <div class="toggle-panel toggle-left">
              <div class="brand-icon"><i class="ri-tools-fill"></i></div>
              <h2>TechFix</h2>
              <p>Manutenção e reparo com quem entende do assunto.</p>
              <button type="button" class="register-bnt">CADASTRAR</button>
            </div>

            <div class="toggle-panel toggle-right">
              <div class="brand-icon"><i class="ri-shield-user-fill"></i></div>
              <h2>Bem-vindo!</h2>
              <p>
                Entre para acompanhar seus serviços e conversar com os
                profissionais.
              </p>
              <button type="button" class="login-bnt">ENTRAR</button>
            </div>
          </div>
        </aside>
      </div>
    </main>

<?php require __DIR__ . '/../partials/footer.php'; ?>
