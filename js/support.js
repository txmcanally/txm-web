(() => {
  const form = document.getElementById("support-form");
  const success = document.getElementById("support-success");
  const errorEl = document.getElementById("form-error");
  const mailtoLink = document.getElementById("support-mailto-link");
  const resetBtn = document.getElementById("support-reset");

  if (!form || !success || !errorEl || !mailtoLink || !resetBtn) return;

  const supportEmail = form.dataset.supportEmail || "support@txm-games.com";

  function showError(message) {
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function buildMailto({ name, email, game, category, platform, subject, message }) {
    const mailSubject = `[TXM Support] ${category}: ${subject}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Game: ${game}`,
      `Category: ${category}`,
      `Platform: ${platform || "Not specified"}`,
      "",
      "Details:",
      message,
      "",
      "—",
      "Sent from txm-games.com/support",
    ].join("\n");

    return `mailto:${supportEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    if (!form.checkValidity()) {
      form.reportValidity();
      showError("Please fill in all required fields.");
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      game: form.game.value,
      category: form.category.value,
      platform: form.platform.value,
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.game || !data.category || !data.subject || !data.message) {
      showError("Please fill in all required fields.");
      return;
    }

    const href = buildMailto(data);
    mailtoLink.href = href;
    window.location.href = href;

    form.hidden = true;
    success.hidden = false;
    success.focus?.();
  });

  resetBtn.addEventListener("click", () => {
    clearError();
    form.reset();
    form.hidden = false;
    success.hidden = true;
    form.name.focus();
  });
})();
