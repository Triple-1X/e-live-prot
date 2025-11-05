// js/filtros.js
(() => {
  // ====== 1) Configuración y utilidades ======
  // Alias para soportar páginas con nombres distintos de atributos/grupos.
  // - En filtros: data-group = clave
  // - En tarjetas: data-[atributo del mapa] = valor
  // Si un grupo no aparece aquí, se usará el mismo nombre del grupo como atributo.
  const ATTR_ALIAS = {
    // Servidor (LoL usa "servidor", Valorant usa "server")
    servidor: "servidor",
    server: "server",

    // CS2 usa "region"
    region: "region",

    // Comunes
    rol: "rol",
    rango: "rango",
    exp: "exp",
    disp: "disp",
    horario: "horario",
    genero: "genero",

    // Equipos
    tipo: "tipo",
    elo: "elo"
  };

  // Contenedores de tarjetas (jugadores / equipos)
  const lists = Array.from(document.querySelectorAll(".jugadores_lista, .equipos_lista"));
  if (lists.length === 0) return; // No hay lista en esta página

  // Todas las tarjetas dentro de las listas (article)
  const cards = lists.flatMap(list => Array.from(list.querySelectorAll("article")));

  // Estado de filtros seleccionados: { grupo: Set([...valores]) }
  const selected = {};

  // Devuelve el atributo (string) presente en la tarjeta que corresponda al grupo
  // Soporta alias: intenta el atributo del grupo, y los alias equivalentes (servidor/server).
  function getCardAttrValue(card, group) {
    // 1) atributo principal
    const mainAttr = ATTR_ALIAS[group] || group;

    // 2) lista de posibles atributos equivalentes según el grupo
    const equivalents = [mainAttr];

    // Normaliza equivalencias servidor/server
    if (group === "servidor") equivalents.push("server");
    if (group === "server") equivalents.push("servidor");

    // Busca el primero que exista en la tarjeta
    for (const attr of equivalents) {
      const v = card.getAttribute(`data-${attr}`);
      if (v !== null) return v;
    }

    // Si no existe, intenta con el propio nombre del grupo por si acaso
    const fallback = card.getAttribute(`data-${group}`);
    return fallback !== null ? fallback : null;
  }

  // Comprueba si la tarjeta cumple TODO el conjunto de filtros activos
  function cardMatchesAllFilters(card) {
    // Para cada grupo con valores seleccionados, la tarjeta debe coincidir con al menos uno
    for (const group of Object.keys(selected)) {
      const values = selected[group];
      if (!values || values.size === 0) continue; // sin filtro en este grupo

      const cardValue = getCardAttrValue(card, group);
      if (cardValue === null) return false;

      // Coincidencia exacta con alguno de los valores seleccionados del grupo
      if (!values.has(cardValue)) {
        return false;
      }
    }
    return true;
  }

  // Aplica los filtros a todas las tarjetas
  function applyFilters() {
    cards.forEach(card => {
      const visible = cardMatchesAllFilters(card);
      card.style.display = visible ? "" : "none";
    });
  }

  // Alterna selección de un botón de filtro dentro de un grupo
  function toggleFilter(group, value, buttonEl) {
    if (!selected[group]) selected[group] = new Set();

    if (selected[group].has(value)) {
      selected[group].delete(value);
      buttonEl.classList.remove("is-active");
    } else {
      selected[group].add(value);
      buttonEl.classList.add("is-active");
    }

    applyFilters();
  }

  // ====== 2) Delegación de eventos sobre todos los botones de filtros ======
  const filterButtons = Array.from(document.querySelectorAll(".filtro_lista button"));

  filterButtons.forEach(btn => {
    // Asegura atributos mínimos para accesibilidad
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-checked", "false");

    btn.addEventListener("click", (e) => {
      const group = btn.getAttribute("data-group");
      const value = btn.getAttribute("data-value");
      if (!group || !value) return;

      const wasActive = btn.classList.contains("is-active");
      toggleFilter(group, value, btn);

      // Actualiza aria-checked
      btn.setAttribute("aria-checked", wasActive ? "false" : "true");
    });

    // Teclado: Enter/Espacio activan
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ====== 3) Opcional: restaurar estado desde querystring en el futuro ======
  // (Dejamos el hook por si luego quieres deep-link de filtros)
  // function loadFromQuery() { ... }
  // function saveToQuery() { ... } -> actualizar URL con history.replaceState

  // Listo: filtros activos = 0 → muestra todo inicialmente
  applyFilters();
})();
