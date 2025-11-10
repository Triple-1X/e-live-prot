
(() => {
  const aliasMap = {
    server: ["server", "servidor"],
    servidor: ["servidor", "server"]
  };

  const cards = Array.from(document.querySelectorAll(".jugadores_lista article, .equipos_lista article"));
  const filterButtons = Array.from(document.querySelectorAll(".filtro_lista button"));
  if (!cards.length || !filterButtons.length) return;

  const selected = {};

  const getCardAttrValue = (card, group) =>
    (aliasMap[group] || [group])
      .map(k => card.dataset[k])
      .find(v => v !== undefined) || null;

  const cardMatchesAllFilters = (card) =>
    Object.entries(selected).every(([group, values]) => {
      if (!values || !values.size) return true;
      const v = getCardAttrValue(card, group);
      return v && values.has(v);
    });

  const applyFilters = () => {
    cards.forEach(card => {
      card.style.display = cardMatchesAllFilters(card) ? "" : "none";
    });
  };


  const toggleFilter = (group, value, btn) => {
    if (!selected[group]) selected[group] = new Set();
    if (selected[group].has(value)) {
      selected[group].delete(value);
      btn.classList.remove("is-active");
    } else {
      selected[group].add(value);
      btn.classList.add("is-active");
    }
    applyFilters();
  };

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const g = btn.dataset.group, v = btn.dataset.value;
      if (!g || !v) return;
      toggleFilter(g, v, btn);
    });

    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  applyFilters();
})();
