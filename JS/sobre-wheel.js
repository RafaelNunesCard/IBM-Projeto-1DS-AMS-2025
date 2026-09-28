/* =====================================================================
   TechFix — Roda de navegação circular (página Sobre Nós)
   ---------------------------------------------------------------------
   - Cada fatia representa uma seção da página (about, problem, cause,
     solution, work, team). Clicar numa fatia rola até a seção.
   - Um IntersectionObserver mantém a fatia da seção visível em destaque.
   - O botão central (ícone de olho) esconde/mostra as fatias, deixando
     só o círculo central visível encostado na borda da tela.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.getElementById("aboutWheel");
  if (!wheel) return; // roda só existe na página Sobre Nós

  const slices = Array.from(wheel.querySelectorAll(".about-wheel__slice"));
  const toggleBtn = document.getElementById("aboutWheelToggle");
  const icon = document.getElementById("aboutWheelIcon");

  // Em telas pequenas, a roda já começa encolhida (o usuário toca pra abrir)
  if (window.innerWidth <= 900) {
    wheel.classList.add("is-collapsed");
    icon.className = "ri-eye-off-line";
  }

  function setActiveSlice(index) {
    slices.forEach((slice, i) => {
      slice.classList.toggle("is-active", i === index);
    });
  }

  // Clique numa fatia -> rola até a seção correspondente
  slices.forEach((slice) => {
    slice.addEventListener("click", () => {
      const targetId = slice.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Botão central: expande/encolhe a roda
  toggleBtn.addEventListener("click", () => {
    const collapsed = wheel.classList.toggle("is-collapsed");
    icon.className = collapsed ? "ri-eye-off-line" : "ri-eye-line";
  });

  // Sincroniza a fatia ativa com a seção visível na tela
  const sectionIds = slices.map((s) => s.getAttribute("data-target"));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      // entre as seções cruzando a "linha" central da tela, usa a mais visível
      let mostVisible = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        }
      });
      if (mostVisible) {
        const index = sectionIds.indexOf(mostVisible.target.id);
        if (index !== -1) setActiveSlice(index);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -55% 0px", // considera "ativa" a seção perto do meio da tela
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Estado inicial
  setActiveSlice(0);
});