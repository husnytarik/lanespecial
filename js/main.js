/* =============================================
   LANE SPECIAL — main.js
   ============================================= */
(function () {
  "use strict";

  /* ── Custom Cursor ── */
  const cursor = document.getElementById("cursor");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.querySelectorAll("a, button, .lv-item").forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover"),
      );
    });
  }

  /* ── Nav scroll ── */
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );
  }

  /* ── Scroll Reveal (generic) ── */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            ro.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );
    reveals.forEach((el) => ro.observe(el));
  }

  /* ── LV grid staggered entrance ── */
  const lvItems = document.querySelectorAll(".lv-item");
  if (lvItems.length) {
    const lo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // stagger by index
            const idx = Array.from(lvItems).indexOf(e.target);
            setTimeout(() => e.target.classList.add("visible"), idx * 90);
            lo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    lvItems.forEach((el) => lo.observe(el));
  }

  /* ── Add to Cart ── */
  const toast = document.getElementById("cartToast");
  let toastTimer = null;

  document.querySelectorAll(".lv-add-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const name = this.dataset.name || "Ürün";

      // Button feedback
      this.textContent = "✓ Eklendi";
      this.classList.add("added");
      setTimeout(() => {
        this.textContent = "Sepete Ekle";
        this.classList.remove("added");
      }, 2200);

      // Toast
      if (toast) {
        toast.textContent = name + " sepete eklendi";
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
      }
    });
  });

  /* ── Hero parallax ── */
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    window.addEventListener(
      "scroll",
      () => {
        const s = window.scrollY;
        if (s < window.innerHeight) {
          heroContent.style.transform = `translateY(${s * 0.16}px)`;
          heroContent.style.opacity = 1 - (s / window.innerHeight) * 1.5;
        }
      },
      { passive: true },
    );
  }

  /* ── Newsletter ── */
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      const btn = form.querySelector("button");
      if (!input.value.trim()) return;
      btn.textContent = "✓";
      input.value = "";
      input.placeholder = "Teşekkürler";
      setTimeout(() => {
        btn.textContent = "Kaydol";
        input.placeholder = "E-posta adresiniz";
      }, 3500);
    });
  }
})();
