/**
 * Sticky promo dismiss + mobile shop bar visibility.
 */
(function () {
  const PROMO_KEY = "blendavit-promo-dismissed";

  function initPromoBar() {
    const bar = document.querySelector("[data-promo-bar]");
    if (!bar) return;

    if (sessionStorage.getItem(PROMO_KEY) === "1") {
      document.body.classList.add("promo-dismissed");
      return;
    }

    const dismiss = () => {
      document.body.classList.add("promo-dismissed");
      sessionStorage.setItem(PROMO_KEY, "1");
    };

    bar.querySelector("[data-promo-dismiss]")?.addEventListener("click", dismiss);
  }

  function initShopBar() {
    const bar = document.querySelector("[data-shop-bar]");
    const hero = document.querySelector(".hero--ella, .hero");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        bar.classList.toggle("is-visible", show);
        bar.setAttribute("aria-hidden", show ? "false" : "true");
      },
      { root: null, threshold: 0, rootMargin: "0px" }
    );
    observer.observe(hero);
  }

  function init() {
    initPromoBar();
    initShopBar();
  }

  function scrollToNewsletter() {
    const section = document.getElementById("newsletter");
    if (!section) return false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    const email = section.querySelector('input[type="email"]');
    if (email) window.setTimeout(() => email.focus(), 400);
    return true;
  }

  window.BLENDAVIT_SITE_CHROME = { scrollToNewsletter };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
