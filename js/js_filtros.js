// js/filtros.js
(() => {

  const ATTR_ALIAS = {

    servidor: "servidor",
    server: "server",

    
    region: "region",

    
    rol: "rol",
    rango: "rango",
    exp: "exp",
    disp: "disp",
    horario: "horario",
    genero: "genero",

    
    tipo: "tipo",
    elo: "elo"
  };


  const lists = Array.from(document.querySelectorAll(".jugadores_lista, .equipos_lista"));
  if (lists.length === 0) return; 


  const cards = lists.flatMap(list => Array.from(list.querySelectorAll("article")));

 
  const selected = {};

 
  function getCardAttrValue(card, group) {
    
    const mainAttr = ATTR_ALIAS[group] || group;

    
    const equivalents = [mainAttr];

   
    if (group === "servidor") equivalents.push("server");
    if (group === "server") equivalents.push("servidor");

    
    for (const attr of equivalents) {
      const v = card.getAttribute(`data-${attr}`);
      if (v !== null) return v;
    }

    
    const fallback = card.getAttribute(`data-${group}`);
    return fallback !== null ? fallback : null;
  }

  
  function cardMatchesAllFilters(card) {
    
    for (const group of Object.keys(selected)) {
      const values = selected[group];
      if (!values || values.size === 0) continue; 

      const cardValue = getCardAttrValue(card, group);
      if (cardValue === null) return false;

      
      if (!values.has(cardValue)) {
        return false;
      }
    }
    return true;
  }

  
  function applyFilters() {
    cards.forEach(card => {
      const visible = cardMatchesAllFilters(card);
      card.style.display = visible ? "" : "none";
    });
  }

  
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

  
  const filterButtons = Array.from(document.querySelectorAll(".filtro_lista button"));

  filterButtons.forEach(btn => {
    
    btn.setAttribute("type", "button");
    btn.setAttribute("role", "switch");
    btn.setAttribute("aria-checked", "false");

    btn.addEventListener("click", (e) => {
      const group = btn.getAttribute("data-group");
      const value = btn.getAttribute("data-value");
      if (!group || !value) return;

      const wasActive = btn.classList.contains("is-active");
      toggleFilter(group, value, btn);

      
      btn.setAttribute("aria-checked", wasActive ? "false" : "true");
    });

    
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });


  applyFilters();
})();