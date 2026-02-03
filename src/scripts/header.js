import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const menubtn = document.querySelector(".menubtn");
  const overlay = document.querySelector(".navOverlay");
  const items = gsap.utils.toArray(".navItem");

  // Overlay height (not full screen)
  gsap.set(overlay, { height: "44vh" });

  // Start hidden above viewport
  gsap.set(overlay, { yPercent: -100 });
  gsap.set(items, { y: -10, autoAlpha: 0 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { overwrite: "auto" },
  });

  tl.to(
    ".headerbar",
    {
      borderBottomWidth: 0,
      duration: 0.05,
      ease: "power1.out",
    },
    0,
  );

  tl.to(overlay, {
    yPercent: 0,
    duration: 0.8,
    ease: "expo.out",
  }).to(
    items,
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.45,
      ease: "back.out(1.4)",
      stagger: 0.06,
      immediateRender: false, // prevents “flash” on reverse/open in some setups
    },
    "-=0.35",
  );

  let isOpen = false;

  const setBtnState = (open) => {
    menubtn.textContent = open ? "× Close" : "= Menu";
    menubtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  menubtn.addEventListener("click", () => {
    // If mid-animation, just flip direction cleanly
    if (tl.isActive()) {
      tl.reversed(!tl.reversed());
      isOpen = !tl.reversed();
      setBtnState(isOpen);
      return;
    }

    if (isOpen) {
      tl.reverse();
      setBtnState(false);
    } else {
      tl.play();
      setBtnState(true);
    }
    isOpen = !isOpen;
  });

  // Optional: close on link click (still uses reverse only)
  overlay.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    tl.reverse();
    isOpen = false;
    setBtnState(false);
  });

  // Optional: ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !isOpen) return;
    tl.reverse();
    isOpen = false;
    setBtnState(false);
  });
});
