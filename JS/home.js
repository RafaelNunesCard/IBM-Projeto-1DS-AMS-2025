/* =====================================================================
   TechFix — Interações da Home
   ---------------------------------------------------------------------
   - Saudação personalizada do usuário logado
   - Contadores animados (números que sobem ao aparecer na tela)
   - Parallax do banner seguindo o mouse
   - Marquee infinito de serviços (clona os cards para loop perfeito)
   - Fallback de animação de scroll e botão "voltar ao topo"
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Saudação do usuário ---------- */
  const headerNome = document.getElementById("headerNome");
  if (headerNome) {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (loggedUser && loggedUser.nome) {
        headerNome.textContent = `Olá ${loggedUser.nome}, você precisa de ajuda?`;
      }
    } catch (e) {
      console.warn("Não foi possível carregar o usuário logado.");
    }
  }

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(step);
  }

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ---------- Parallax do banner ---------- */
  const banner = document.getElementById("banr_home");
  const bannerImg = document.querySelector("#img_banr img");

  if (banner && bannerImg && window.matchMedia("(pointer: fine)").matches) {
    banner.addEventListener("mousemove", (e) => {
      const rect = banner.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bannerImg.style.transform = `translate(${x * 24}px, ${y * 24}px)`;
    });

    banner.addEventListener("mouseleave", () => {
      bannerImg.style.transform = "translate(0, 0)";
    });
  }

  /* ---------- Marquee de serviços (loop perfeito) ---------- */
  const track = document.querySelector(".container_servicos");
  if (track) {
    const cards = Array.from(track.children);
    cards.forEach((card) => track.appendChild(card.cloneNode(true)));
  }

  /* ---------- Fallback de animação de scroll ---------- */
  const supportsView =
    window.CSS &&
    CSS.supports &&
    (CSS.supports("animation-timeline: view()") ||
      CSS.supports("animation-timeline", "view()"));

  if (!supportsView) {
    document.body.classList.add("no-view");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".autoShow")
      .forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Botão voltar ao topo ---------- */
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.setAttribute("aria-label", "Voltar ao topo");
  scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  });
});
