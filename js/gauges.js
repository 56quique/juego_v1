// gauge.js
export function crearGauge(id, min, max, config = {}) {

  const el = document.getElementById(id);
  if (!el) return;

  const unidad = config.unidad || "";
  const label = config.label || "";
  const zonas = config.zonas || [];

  // =========================
  // CREAR ESTRUCTURA
  // =========================
  el.innerHTML = `
    <div class="gauge-box">
      <div class="gauge-header">
        <div class="gauge-label">${label}</div>
        <div class="gauge-value">0 ${unidad}</div>
      </div>

      <div class="gauge-body">
        <div class="scale"></div>
        <div class="line"></div>
        <div class="cursor"></div>
      </div>
    </div>
  `;

  const scaleEl = el.querySelector(".scale");
  const cursor = el.querySelector(".cursor");
  const valueEl = el.querySelector(".gauge-value");

  // =========================
  // CREAR ESCALA
  // =========================
  const steps = 6;

  for (let i = 0; i <= steps; i++) {
    const v = min + (i * (max - min) / steps);

    const tick = document.createElement("div");
    tick.className = "tick";

    const num = document.createElement("span");
    num.textContent = Math.round(v);

    // color según zona (solo número)
    let color = "#aaa";
    zonas.forEach(z => {
      if (v >= z.from && v <= z.to) color = z.color;
    });

    num.style.color = color;

    tick.appendChild(num);
    scaleEl.appendChild(tick);
  }

  // =========================
  // ACTUALIZAR
  // =========================
  function set(valor) {

    const percent = ((valor - min) / (max - min)) * 100;
    const p = Math.max(0, Math.min(100, percent));

    cursor.style.bottom = p + "%";

    valueEl.textContent = valor.toFixed(1) + " " + unidad;
  }

  return { set };
}
