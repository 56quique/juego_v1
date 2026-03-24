document.addEventListener("DOMContentLoaded", () => {

  function crearEscala(el, min, max) {
    el.innerHTML = "";

    for (let i = 0; i <= 5; i++) {
      const val = max - (i * (max - min) / 5);

      const tick = document.createElement("div");
      tick.className = "tick";

      tick.innerHTML = `
        <div class="tick-line"></div>
        <div>${Math.round(val)}</div>
      `;

      el.appendChild(tick);
    }
  }

  // Crear escalas
  crearEscala(document.getElementById("scaleV1"), 0, 300);
  crearEscala(document.getElementById("scaleV2"), 0, 300);
  crearEscala(document.getElementById("scaleV3"), 0, 300);

  crearEscala(document.getElementById("scaleI1"), 0, 150);
  crearEscala(document.getElementById("scaleI2"), 0, 150);
  crearEscala(document.getElementById("scaleI3"), 0, 150);

  function setGauge(id, value, min, max, unidad, horizontal = false) {
    const el = document.getElementById(id);
    const valEl = document.getElementById("val_" + id);

    const percent = ((value - min) / (max - min)) * 100;

    el.innerHTML = "";

    const fill = document.createElement("div");
    fill.className = "fill";

    if (horizontal) fill.style.width = percent + "%";
    else fill.style.height = percent + "%";

    if (percent > 80) fill.style.background = "#f00";
    else if (percent > 50) fill.style.background = "#ff0";
    else fill.style.background = "#0f0";

    el.appendChild(fill);

    valEl.textContent = value.toFixed(1) + " " + unidad;
  }

  setInterval(() => {

    setGauge("vL1", 220 + Math.random()*20, 0, 300, "V");
    setGauge("vL2", 210 + Math.random()*30, 0, 300, "V");
    setGauge("vL3", 230 + Math.random()*10, 0, 300, "V");

    setGauge("iL1", Math.random()*120, 0, 150, "A");
    setGauge("iL2", Math.random()*100, 0, 150, "A");
    setGauge("iL3", Math.random()*130, 0, 150, "A");

    setGauge("freq", 49 + Math.random()*2, 45, 55, "Hz", true);

  }, 1000);

});