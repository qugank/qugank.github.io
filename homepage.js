(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    });
  });

  // Reveal on view
  if (!prefersReduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".section, .hero-body, .hero-card").forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
})();
