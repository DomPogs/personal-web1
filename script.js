document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const header = document.querySelector(".site-header");

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 35, 220)}ms`;
    observer.observe(el);
  });

  document.querySelector("#year")?.replaceChildren(String(new Date().getFullYear()));
});