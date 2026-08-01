(function () {
  var STORAGE_KEY = "txm_cookie_consent";
  var MEASUREMENT_ID = "G-R2ZX3PWPZ3";

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }

  function applyConsent(granted) {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: granted ? "granted" : "denied",
    });

    if (granted) {
      gtag("config", MEASUREMENT_ID);
    }
  }

  function hideBanner(banner) {
    if (!banner) return;
    banner.classList.add("is-hiding");
    window.setTimeout(function () {
      banner.remove();
    }, 220);
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {
      /* ignore storage failures */
    }
  }

  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function showBanner() {
    var banner = document.createElement("div");
    banner.className = "consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie notice");
    banner.innerHTML =
      '<div class="consent-banner-inner">' +
      "<p>We use Google Analytics to understand site traffic. Analytics is on by default. " +
      'See our <a href="/privacy/">privacy policy</a>.</p>' +
      '<div class="consent-banner-actions">' +
      '<button type="button" class="btn-secondary" data-consent="decline">Opt out</button>' +
      '<button type="button" class="btn-primary" data-consent="accept">Got it</button>' +
      "</div></div>";

    document.body.appendChild(banner);

    banner.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (!button) return;

      var choice = button.getAttribute("data-consent");
      var accepted = choice !== "decline";
      saveChoice(accepted ? "accepted" : "declined");
      applyConsent(accepted);
      hideBanner(banner);
    });
  }

  function init() {
    var choice = readChoice();

    if (choice === "declined") {
      applyConsent(false);
      return;
    }

    // Opt-out model: analytics runs unless the visitor has declined.
    applyConsent(true);

    if (choice !== "accepted") {
      showBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
