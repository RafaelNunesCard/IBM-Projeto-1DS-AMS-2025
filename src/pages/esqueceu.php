<?php
$titulo = 'TechFix - Alterar senha';
$css = ['../../assets/css/cadastro.css'];
$js = [];
$paginaAtual = '';
require __DIR__ . '/../partials/header.php';
?>
    <main class="auth">
      <div class="container">
        <!-- ==================== FORMULÁRIO ==================== -->
        <div class="auth-forms">
          <div class="form-box login">
            <form action="">
              <div class="form-head">
                <span class="badge"
                  ><i class="ri-lock-password-line"></i> Recuperar acesso</span
                >
                <h1>Alterar senha</h1>
                <p>Informe seu e-mail e defina uma nova senha de acesso.</p>
              </div>

              <div class="input-box">
                <i class="ri-mail-fill"></i>
                <input type="text" placeholder="E-mail" required />
              </div>

              <div class="input-box">
                <i class="ri-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Nova senha"
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

              <div class="input-box">
                <i class="ri-lock-fill"></i>
                <input
                  type="password"
                  placeholder="Confirmar senha"
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

              <button
                type="button"
                class="btn"
                id="bnt-alterar"
                onclick="validateForm()"
              >
                ALTERAR SENHA
              </button>

              <p class="switch-text">
                Lembrou a senha?
                <a href="cadastro.php" class="link">Entrar</a>
              </p>
            </form>
          </div>
        </div>

        <!-- ==================== PAINEL DE MARCA ==================== -->
        <aside class="auth-aside">
          <span class="aside-glow"></span>
          <i class="ri-tools-fill float-icon i1"></i>
          <i class="ri-key-2-fill float-icon i2"></i>
          <i class="ri-shield-keyhole-fill float-icon i3"></i>

          <div class="toggle-box">
            <div class="toggle-panel toggle-left">
              <div class="brand-icon"><i class="ri-key-2-fill"></i></div>
              <h2 id="titulo-esqueceu">Você lembrou sua senha!</h2>
              <p>Deseja voltar para o login?</p>
              <a
                href="cadastro.php"
                class="login-bnt"
                style="display: inline-block; text-decoration: none"
                >ENTRAR</a
              >
            </div>
          </div>
        </aside>
      </div>
    </main>

    <script>
      function validateForm() {
        const formArea = document.querySelector(".form-box.login");
        const email = formArea.querySelector('input[type="text"]');
        const senhas = formArea.querySelectorAll('input[type="password"]');

        if (
          !email.value.trim() ||
          !senhas[0].value.trim() ||
          !senhas[1].value.trim()
        ) {
          alert("Por favor, preencha todos os campos.");
          return;
        }

        if (senhas[0].value !== senhas[1].value) {
          alert("As senhas não coincidem. Tente novamente.");
          return;
        }

        alert("Senha alterada com sucesso!");
        window.location.href = "cadastro.php";
      }

      // Mostrar / ocultar senha
      document.querySelectorAll(".toggle-pass").forEach((btn) => {
        btn.addEventListener("click", () => {
          const input = btn.parentElement.querySelector("input");
          if (!input) return;
          const isPassword = input.type === "password";
          input.type = isPassword ? "text" : "password";
          const icon = btn.querySelector("i");
          if (icon) {
            icon.classList.toggle("ri-eye-line", !isPassword);
            icon.classList.toggle("ri-eye-off-line", isPassword);
          }
        });
      });
    </script>

<?php require __DIR__ . '/../partials/footer.php'; ?>
