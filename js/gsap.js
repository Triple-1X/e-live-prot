
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


gsap.from(
  ".card_jugador, .card_equipo, .card_equipo_horizontal, .card_noticia, .noticia, .torneo_card, .filtro, .filtros, .perfil_contenedor, .crear_perfil_caja, .comunes_box, .juegos_box, .scrims_box, .noticia_articulo",
  {
    opacity: 0,
    scale: 0.97,
    duration: 0.8,
    stagger: 0.08,
    ease: "power1.out",
    delay: 0.4
  }
);


gsap.from(".footer", {
  opacity: 0,
  y: 30,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.6
});


document.querySelectorAll(".btn_contactar, .btn_inscribir, .btn_crear_perfil").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { backgroundColor: "#8C46A0", duration: 0.25, ease: "power1.out" });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { backgroundColor: "#E2404A", duration: 0.25, ease: "power1.out" });
  });
});


document.querySelectorAll(".card_jugador, .card_equipo, .card_equipo_horizontal, .card_noticia, .noticia, .torneo_card, .filtro, .filtros, .perfil_contenedor, .crear_perfil_caja, .comunes_box, .juegos_box, .scrims_box, .noticia_articulo").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { boxShadow: "0 0 25px 3px rgba(226,64,74,0.85)", duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
  });
});


