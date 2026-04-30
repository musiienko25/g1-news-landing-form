(() => {
  const formSection = document.getElementById("lead-form");
  const form = document.getElementById("contact-form");
  const errorBox = document.getElementById("form-error");
  const phoneInput = document.getElementById("phone");

  let iti = null;
  if (window.intlTelInput && phoneInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "br",
      separateDialCode: true,
      strictMode: true,
      nationalMode: false,
      loadUtils: () =>
        import("https://cdn.jsdelivr.net/npm/intl-tel-input@23.8.0/build/js/utils.js"),
    });
  }

  const scrollToForm = (event) => {
    if (event) {
      event.preventDefault();
    }
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll("a, button").forEach((element) => {
    const isSubmit = element.tagName === "BUTTON" && element.type === "submit";
    if (isSubmit) {
      return;
    }
    element.addEventListener("click", (event) => {
      const href = element.getAttribute("href") || "";
      if (element.classList.contains("cta-link") || href.startsWith("#")) {
        scrollToForm(event);
      }
    });
  });

  const showError = (message) => {
    errorBox.textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showError("");

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName.length < 2) {
      showError("Ingresa un nombre valido.");
      return;
    }
    if (lastName.length < 2) {
      showError("Ingresa un apellido valido.");
      return;
    }
    if (!emailRegex.test(email)) {
      showError("Ingresa un correo valido.");
      return;
    }
    if (!phoneInput.value.trim()) {
      showError("Ingresa un telefono valido.");
      return;
    }
    if (iti && !iti.isValidNumber()) {
      showError("Ingresa un telefono valido.");
      return;
    }

    window.location.href = "thank-you.html";
  });
})();
