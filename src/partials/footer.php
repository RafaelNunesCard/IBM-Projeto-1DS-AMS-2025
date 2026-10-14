<?php
/* =====================================================================
   TechFix — Footer parcial (src/partials/footer.php)
   ---------------------------------------------------------------------
   Opcional: $jsRodape (array) — scripts carregados no fim do body.
   ===================================================================== */

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

$jsRodape = $jsRodape ?? [];
?>
    <footer>
      <div class="footer-container">
        <div class="footer-column footer-marca">
          <a class="footer-logo-link" href="home.php">
            <img src="../../assets/img/Logo-cinza.png" alt="Logo TechFix" />
            <span class="footer-logo-nome">TechFix</span>
          </a>
          <p class="footer footer-tagline">
            Excelência nos serviços e qualidade nos produtos. Nosso compromisso
            é com você!
          </p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"
              ><i class="ri-facebook-box-fill" aria-hidden="true"></i
            ></a>
            <a href="#" aria-label="Instagram"
              ><i class="ri-instagram-line" aria-hidden="true"></i
            ></a>
            <a href="#" aria-label="LinkedIn"
              ><i class="ri-linkedin-box-fill" aria-hidden="true"></i
            ></a>
          </div>
        </div>

        <div class="footer-column">
          <h3>Navegação</h3>
          <ul class="footer-links">
            <li class="footer"><a href="home.php">Início</a></li>
            <li class="footer"><a href="sobre.php">Sobre nós</a></li>
            <li class="footer"><a href="servico.php">Serviços</a></li>
            <li class="footer"><a href="contato.php">Contato</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Contato</h3>
          <ul class="footer-contato">
            <li class="footer">
              <i class="ri-mail-line" aria-hidden="true"></i>
              <a href="mailto:TechFix@gmail.com">TechFix@gmail.com</a>
            </li>
            <li class="footer">
              <i class="ri-phone-line" aria-hidden="true"></i>
              <a href="tel:+5511970184779">(11) 97018-4779</a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>Novidades</h3>
          <p class="footer footer-tagline">
            Receba dicas de manutenção e novidades da TechFix.
          </p>
          <form class="newsletter" id="newsletter" novalidate>
            <label class="sr-only" for="news_email">Seu e-mail</label>
            <input
              type="email"
              id="news_email"
              name="email"
              placeholder="seu@email.com"
              autocomplete="email"
            />
            <button
              type="submit"
              class="newsletter-btn"
              aria-label="Inscrever-se"
            >
              <i class="ri-send-plane-fill" aria-hidden="true"></i>
            </button>
          </form>
          <p class="newsletter-msg" id="news_msg" role="status" hidden></p>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer footer-copy">
          © <span id="ano_atual">2026</span> TechFix. Todos os direitos
          reservados.
        </p>
        <button type="button" class="voltar-topo" id="voltar_topo">
          <i class="ri-arrow-up-line" aria-hidden="true"></i> Voltar ao topo
        </button>
      </div>
    </footer>
    <script src="../../assets/js/footer.js" defer></script>
<?php foreach ($jsRodape as $arquivo): ?>
    <script src="<?= htmlspecialchars((string) $arquivo, ENT_QUOTES, 'UTF-8') ?>"></script>
<?php endforeach; ?>
  </body>
</html>
