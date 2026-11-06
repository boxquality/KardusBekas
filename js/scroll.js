export function initScroll() {
  const topbar = document.querySelector(".topbar");
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (topbar) {
      topbar.style.boxShadow = y > 30 ? "0 8px 28px #0008" : "none";
      topbar.style.borderBottomColor = y > 30 ? "#c99a4230" : "#ffffff12";
    }
    lastY = y;
  }, { passive: true });
}
