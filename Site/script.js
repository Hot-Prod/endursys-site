// EndurSys — comportements communs (menu mobile + formulaire de contact)

document.addEventListener("DOMContentLoaded", function () {
  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Formulaire de contact — envoi réel via FormSubmit.co (gratuit, sans backend).
  // On garde juste une validation HTML5 avant l'envoi ; la soumission elle-même
  // suit son cours normal vers FormSubmit puis redirige vers merci.html.
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
      }
    });
  }
});
