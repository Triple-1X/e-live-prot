gsap.from(".header", {
  y: -60,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#contenedor", {
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.2
});

gsap.from(".t1, .t2, h1, h2", {
  opacity: 0,
  y: 25,
  duration: 1,
  stagger: 0.15,
  ease: "power2.out"
});

const tarjetas =
  ".card_jugador, .card_equipo, .card_equipo_horizontal, .card_noticia, .noticia_articulo, .torneo_card, .scrim-card";

if (document.querySelector(tarjetas)) {
  gsap.from(tarjetas, {
    opacity: 0,
    scale: 0.97,
    duration: 0.8,
    stagger: 0.08,
    ease: "power1.out",
    delay: 0.4
  });
}

gsap.from(".footer", {
  opacity: 0,
  y: 30,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.6
});
