import { initLoader } from "./loader.js";
import { init3DScene } from "./3d.js";
import { initAnimations } from "./animation.js";
import { initScroll } from "./scroll.js";

const ready = () => {
  initLoader();
  initAnimations();
  initScroll();
  init3DScene("box3d");
  initNavigation();
  initOrderForm();
};

function initNavigation() {
  const toggle = document.querySelector("#menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(opened));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

function initOrderForm() {
  const form = document.querySelector("#order-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      "Halo BOXQUALITY, saya ingin bertanya / memesan.",
      "",
      `Nama: ${data.get("nama") || "-"}`,
      `Nomor HP: ${data.get("telepon") || "-"}`,
      `Layanan: ${data.get("layanan") || "-"}`,
      `Jumlah/kebutuhan: ${data.get("jumlah") || "-"}`,
      `Lokasi: ${data.get("lokasi") || "-"}`,
      `Detail: ${data.get("detail") || "-"}`
    ].join("\\n");
    window.open(`https://wa.me/6285736213152?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready, { once: true });
} else {
  ready();
}
