const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
    faq.setAttribute(
      "aria-expanded",
      faq.classList.contains("active") ? "true" : "false"
    );
  });

  faq.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      faq.click();
    }
  });
});