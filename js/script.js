"use strict";

const WHATSAPP_NUMBER = "6285736213152";

// Sembunyikan loading screen setelah halaman siap, dengan batas waktu fallback.
const loader = document.getElementById("loader");
function hideLoader() {
  if (!loader) return;
  loader.classList.add("is-hidden");
  document.body.classList.remove("loading");
}
document.body.classList.add("loading");
window.addEventListener("load", () => window.setTimeout(hideLoader, 450), { once: true });
window.setTimeout(hideLoader, 2200);

// Menu navigasi untuk layar kecil.
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
  mainNav?.classList.toggle("is-open", !isOpen);
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Buka menu");
  });
});

// Animasi elemen saat masuk ke viewport; gunakan fallback jika browser tak mendukung.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Kardus jatuh dekoratif. Jumlah dibatasi untuk menjaga performa.
const fallingBoxes = document.getElementById("fallingBoxes");
if (fallingBoxes && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 9; i += 1) {
    const box = document.createElement("span");
    box.className = "falling-carton";
    box.style.left = `${8 + Math.random() * 84}%`;
    box.style.setProperty("--size", `${12 + Math.random() * 20}px`);
    box.style.setProperty("--duration", `${18 + Math.random() * 24}s`);
    box.style.setProperty("--delay", `${-Math.random() * 30}s`);
    fallingBoxes.appendChild(box);
  }
}

// Filter katalog.
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    productCards.forEach((card) => {
      const shouldHide = selectedFilter !== "all" && card.dataset.size !== selectedFilter;
      card.classList.toggle("is-filtered", shouldHide);
    });
  });
});

// Tombol panah di setiap produk memilih kategori terkait di formulir.
document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product;
    const typeSelect = document.getElementById("requestType");
    if (!typeSelect) return;
    if (productName === "Compact Box") typeSelect.value = "Kardus bekas ukuran kecil";
    if (productName === "Everyday Box") typeSelect.value = "Kardus bekas ukuran sedang";
    if (productName === "Storage Box") typeSelect.value = "Kardus bekas ukuran besar";
  });
});

// Buat pesan WhatsApp dari data formulir.
const orderForm = document.getElementById("orderForm");
orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.reportValidity()) return;

  const formData = new FormData(orderForm);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const type = String(formData.get("type") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const lines = [
    "Halo BOXQUALITY, saya ingin bertanya / melakukan pemesanan.",
    "",
    `Nama: ${name}`,
    `Nomor WhatsApp: ${phone}`,
    `Kebutuhan: ${type}`,
    message ? `Detail: ${message}` : null,
    "",
    "Mohon informasi stok, kondisi, ukuran, dan detail layanan. Terima kasih."
  ].filter(Boolean);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
