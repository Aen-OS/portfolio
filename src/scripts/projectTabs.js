import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-tab").forEach((projectTab) => {
    const viewPill = projectTab.querySelector(".viewPill");
    const img = projectTab.querySelector(".logo");
    const text = projectTab.querySelector(".text-content");

    gsap.set(viewPill, {
      scaleX: 0,
      transformOrigin: "left center",
      paddingLeft: 0,
      paddingRight: 0,
    });

    const shiftX = viewPill.scrollWidth + 16;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out", duration: 0.35 },
    });

    tl.to(
      viewPill,
      {
        scaleX: 1,
      },
      0,
    )
      .to(
        viewPill,
        {
          paddingLeft: 16,
          paddingRight: 16,
        },
        0,
      )
      .to(
        img,
        {
          x: shiftX,
        },
        0,
      )
      .to(
        text,
        {
          x: shiftX,
          opacity: 0,
        },
        0,
      );

    projectTab.addEventListener("mouseenter", () => tl.play());
    projectTab.addEventListener("mouseleave", () => tl.reverse());
  });
});
