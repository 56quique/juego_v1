document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ESCALAS (BIEN HECHO)
  // =========================
  function crearEscala(id, min, max) {
    const el = document.getElementById(id);

    for (let i = 0; i <= 5; i++) {
      const val = max - (i * (max - min) / 5);

      const div = document.createElement("div");
      div.textContent = Math.round(val);

      el.appendChild(div);
    }
  }

  // Escalas tensión
  crearEscala("scaleV1", 0, 300);
  crearEscala("scaleV2", 0, 300);
  crearEscala("scaleV3", 0, 300);

  // Escalas corriente
  crearEscala("scaleI1", 0, 150);
  crearEscala("scaleI2", 0, 150);
  crearEscala("scaleI3", 0, 150);

  // =========================
  // CREAR BARRAS UNA SOLA VEZ
  // =========================
  function initGauge(id) {
    const el = document.getElementById(id);

    const fill = document.createElement("div");
    fill.className = "fill";

    el.appendChild(fill);
    return fill;
  }

  const bars = {
    vL1: initGauge("vL1"),
    vL2: initGauge("vL2"),
    vL3: initGauge("vL3"),

    iL1: initGauge("iL1"),
    iL2: initGauge("iL2"),
    iL3: initGauge("iL3"),

    freq: initGauge("freq")
  };

  // =========================
  // ELEMENTOS DE TEXTO
  // =========================
  const values = {
    vL1: document.getElementById("val_vL1"),
    vL2: document.getElementById("val_vL2"),
    vL3: document.getElementById("val_vL3"),

    iL1: document.getElementById("val_iL1"),
    iL2: document.getElementById("val_iL2"),
    iL3: document.getElementById("val_iL3"),

    freq: document.getElementById("val_freq")
  };

  // =========================
  // ACTUALIZAR GAUGE
  // =========================
  function updateGauge(fill, value, min, max, valueEl, unidad, horizontal = false) {
    const percent = ((value - min) / (max - min)) * 100;

    // limitar
    const p = Math.max(0, Math.min(100, percent));

    if (horizontal) fill.style.width = p + "%";
    else fill.style.height = p + "%";

    // colores (más realistas)
    if (unidad === "V") {
      // tensión real
      if (value < 210 || value > 240) fill.style.background = "red";
      else fill.style.background = "lime";
    } else if (unidad === "A") {
      if (value > 120) fill.style.background = "red";
      else if (value > 80) fill.style.background = "yellow";
      else fill.style.background = "lime";
    } else if (unidad === "Hz") {
      if (value < 48 || value > 52) fill.style.background = "red";
      else fill.style.background = "lime";
    }

    valueEl.textContent = value.toFixed(1) + " " + unidad;
  }

  // =========================
  // SIMULACIÓN
  // =========================
  setInterval(() => {

    updateGauge(bars.vL1, 220 + Math.random()*20, 0, 300, values.vL1, "V");
    updateGauge(bars.vL2, 210 + Math.random()*30, 0, 300, values.vL2, "V");
    updateGauge(bars.vL3, 230 + Math.random()*10, 0, 300, values.vL3, "V");

    updateGauge(bars.iL1, Math.random()*120, 0, 150, values.iL1, "A");
    updateGauge(bars.iL2, Math.random()*100, 0, 150, values.iL2, "A");
    updateGauge(bars.iL3, Math.random()*130, 0, 150, values.iL3, "A");

    updateGauge(bars.freq, 49 + Math.random()*2, 45, 55, values.freq, "Hz", true);

  }, 1000);

});
