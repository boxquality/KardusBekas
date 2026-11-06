export function initAnimations() {
  const cards = document.querySelectorAll(".service-card,.product-card,.stats-row>div,.section-head,.about-layout");
  cards.forEach(el => el.setAttribute("data-reveal", ""));
  if (!("IntersectionObserver" in window)) {
    cards.forEach(el => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(el => observer.observe(el));
}
