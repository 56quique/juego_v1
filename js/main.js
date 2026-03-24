document.addEventListener("DOMContentLoaded", () => {

  function crearEscala(el, min, max) {
    for (let i = 0; i <= 5; i++) {
      const val = max - (i * (max - min) / 5);
      const div = document.createElement("div");
      div.textContent = Math.round(val);
      el.appendChild(div);
    }
  }

  // Escalas
  crearEscala(scaleV1, 0, 300);
  crearEscala(scaleV2, 0, 300);
  crearEscala(scaleV3, 0, 300);

  crearEscala(scaleI1, 0, 150);
  crearEscala(scaleI2, 0, 150);
  crearEscala(scaleI3, 0, 150);

  // Crear barras UNA SOLA VEZ
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

  function updateGauge(fill, value, min, max, valEl, unidad, horizontal = false) {
    const percent = ((value - min) / (max - min)) * 100;

    if (horizontal) fill.style.width = percent + "%";
    else fill.style.height = percent + "%";

    // colores
    if (percent > 80) fill.style.background = "red";
    else if (percent > 50) fill.style.background = "yellow";
    else fill.style.background = "lime";

    valEl.textContent = value.toFixed(1) + " " + unidad;
  }

  setInterval(() => {

    updateGauge(bars.vL1, 220 + Math.random()*20, 0, 300, val_vL1, "V");
    updateGauge(bars.vL2, 210 + Math.random()*30, 0, 300, val_vL2, "V");
    updateGauge(bars.vL3, 230 + Math.random()*10, 0, 300, val_vL3, "V");

    updateGauge(bars.iL1, Math.random()*120, 0, 150, val_iL1, "A");
    updateGauge(bars.iL2, Math.random()*100, 0, 150, val_iL2, "A");
    updateGauge(bars.iL3, Math.random()*130, 0, 150, val_iL3, "A");

    updateGauge(bars.freq, 49 + Math.random()*2, 45, 55, val_freq, "Hz", true);

  }, 1000);

});