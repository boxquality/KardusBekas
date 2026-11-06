export function initLoader() {
  const loader = document.querySelector("#site-loader");
  const shell = document.querySelector(".site-shell");
  const bar = document.querySelector("#loader-progress");
  const percent = document.querySelector("#loader-percent");
  if (!loader || !shell) return;
  let value = 0;
  const tick = () => {
    value = Math.min(100, value + (value < 70 ? 9 : 4));
    if (bar) bar.style.width = `${value}%`;
    if (percent) percent.textContent = `${String(value).padStart(2, "0")}%`;
    if (value < 100) {
      window.setTimeout(tick, 55);
    } else {
      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        shell.classList.add("is-ready");
        document.body.classList.remove("loading");
      }, 250);
    }
  };
  document.body.classList.add("loading");
  tick();
}
