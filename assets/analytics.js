/* EndurSys — mesure d'audience GA4 sous consentement préalable.
 *
 * Principe : aucun script Google n'est chargé et aucune requête n'est émise
 * tant que le visiteur n'a pas accepté explicitement. Le refus est un choix
 * durable, au même titre que l'acceptation, et reste révocable à tout moment
 * via un élément portant l'attribut data-consent-manage.
 *
 * Événements : page_view (automatique), email_click, contact_click,
 * case_studies_click et contact_submit (via endursysTrack dans site.js),
 * plus booking_click, form_start et generate_lead définis ici.
 */
(function () {
  "use strict";

  var GA_ID = "G-WT68ZRWNR8";
  var STORAGE_KEY = "esys_consent_v1";
  var GRANTED = "granted";
  var DENIED = "denied";

  var gaLoaded = false;
  var banner = null;

  /* ---------- persistance du choix ---------- */

  function readChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // navigation privée ou stockage bloqué : on redemandera.
    }
  }

  function writeChoice(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* sans stockage, le choix ne vaut que pour la session en cours. */
    }
  }

  /* ---------- chargement GA4 ---------- */

  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    // Consent Mode v2 : tout refusé par défaut, puis accord sur le seul
    // périmètre mesure d'audience. Aucune finalité publicitaire.
    window.gtag("consent", "default", {
      ad_storage: DENIED,
      ad_user_data: DENIED,
      ad_personalization: DENIED,
      analytics_storage: DENIED
    });
    window.gtag("consent", "update", { analytics_storage: GRANTED });

    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(tag);

    trackPageEvents();
  }

  function track(event, props) {
    if (typeof window.endursysTrack === "function") {
      window.endursysTrack(event, props || {});
    } else if (typeof window.gtag === "function") {
      window.gtag("event", event, props || {});
    }
  }

  /* ---------- événements ---------- */

  // generate_lead : uniquement sur la page de confirmation d'envoi.
  function trackPageEvents() {
    if (/\/merci\.html$/.test(window.location.pathname)) {
      track("generate_lead", { page: window.location.pathname });
    }
  }

  var BOOKING = /(calendly\.com|cal\.com|meetings\.|rdv|rendez-vous)/i;

  function bindEvents() {
    // booking_click — les liens de prise de rendez-vous, qu'ils soient
    // marqués explicitement ou reconnaissables à leur URL.
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      // site.js gère déjà les liens marqués data-track : ne pas doubler.
      if (a.dataset && a.dataset.track) return;
      if (BOOKING.test(href)) {
        track("booking_click", { href: href });
      }
    });

    // form_start — première interaction réelle avec un formulaire, une
    // seule fois par formulaire et par page.
    document.querySelectorAll("form").forEach(function (form) {
      var started = false;
      form.addEventListener(
        "focusin",
        function () {
          if (started) return;
          started = true;
          track("form_start", { page: window.location.pathname });
        },
        true
      );
    });
  }

  /* ---------- bandeau de consentement ---------- */

  function removeBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  function decide(value) {
    writeChoice(value);
    removeBanner();
    if (value === GRANTED) loadGA();
  }

  function showBanner() {
    if (banner) return;

    banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Choix de mesure d'audience");

    var text = document.createElement("p");
    text.className = "consent-text";
    text.innerHTML =
      "Nous aimerions mesurer l'audience de ce site pour l'améliorer. " +
      "Aucune donnée n'est collectée sans votre accord, et rien n'est utilisé " +
      'à des fins publicitaires. <a href="confidentialite.html">En savoir plus</a>.';

    var actions = document.createElement("div");
    actions.className = "consent-actions";

    var refuse = document.createElement("button");
    refuse.type = "button";
    refuse.className = "btn";
    refuse.textContent = "Refuser";
    refuse.addEventListener("click", function () {
      decide(DENIED);
    });

    var accept = document.createElement("button");
    accept.type = "button";
    accept.className = "btn primary";
    accept.textContent = "Accepter";
    accept.addEventListener("click", function () {
      decide(GRANTED);
    });

    actions.appendChild(refuse);
    actions.appendChild(accept);
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  /* ---------- point d'entrée ---------- */

  function start() {
    bindEvents();

    document.querySelectorAll("[data-consent-manage]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
    });

    var choice = readChoice();
    if (choice === GRANTED) {
      loadGA();
    } else if (choice !== DENIED) {
      showBanner();
    }
  }

  // Permet de revenir sur son choix depuis la console ou un lien dédié.
  window.endursysConsent = {
    get: readChoice,
    accept: function () {
      decide(GRANTED);
    },
    revoke: function () {
      decide(DENIED);
    },
    ask: showBanner
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
