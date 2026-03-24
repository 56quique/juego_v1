document.addEventListener("DOMContentLoaded", () => {

  function crearEscalaVertical(el, min, max) {
    const scale = document.createElement("div");
    scale.className = "scale-v";

    scale.innerHTML = `
      <div>${max}</div>
      <div>${Math.round((max+min)/2)}</div>
      <div>${min}</div>
    `;

    el.appendChild(scale);
  }

  function crearEscalaHorizontal(el, min, max) {
    const scale = document.createElement("div");
    scale.className = "scale-h";

    scale.innerHTML = `
      <div>${min}</div>
      <div>${Math.round((max+min)/2)}</div>
      <div>${max}</div>
    `;

    el.appendChild(scale);
  }

  const gauges = {
    vL1: { el: document.getElementById("vL1"), min: 0, max: 300 },
    vL2: { el: document.getElementById("vL2"), min: 0, max: 300 },
    vL3: { el: document.getElementById("vL3"), min: 0, max: 300 },

    iL1: { el: document.getElementById("iL1"), min: 0, max: 150 },
    iL2: { el: document.getElementById("iL2"), min: 0, max: 150 },
    iL3: { el: document.getElementById("iL3"), min: 0, max: 150 },

    freq: { el: document.getElementById("freq"), min: 45, max: 55 }
  };

  // Crear escalas
  crearEscalaVertical(gauges.vL1.el, 0, 300);
  crearEscalaVertical(gauges.vL2.el, 0, 300);
  crearEscalaVertical(gauges.vL3.el, 0, 300);

  crearEscalaVertical(gauges.iL1.el, 0, 150);
  crearEscalaVertical(gauges.iL2.el, 0, 150);
  crearEscalaVertical(gauges.iL3.el, 0, 150);

  crearEscalaHorizontal(gauges.freq.el, 45, 55);

  function setGauge(g, value, horizontal = false) {
    const percent = ((value - g.min) / (g.max - g.min)) * 100;

    const fill = document.createElement("div");
    fill.className = "fill";

    if (horizontal) {
      fill.style.width = percent + "%";
    } else {
      fill.style.height = percent + "%";
    }

    if (percent > 80) fill.style.background = "#f00";
    else if (percent > 50) fill.style.background = "#ff0";
    else fill.style.background = "#0f0";

    g.el.querySelectorAll(".fill").forEach(e => e.remove());
    g.el.appendChild(fill);
  }

  setInterval(() => {

    setGauge(gauges.vL1, 220 + Math.random() * 20);
    setGauge(gauges.vL2, 210 + Math.random() * 30);
    setGauge(gauges.vL3, 230 + Math.random() * 10);

    setGauge(gauges.iL1, Math.random() * 120);
    setGauge(gauges.iL2, Math.random() * 100);
    setGauge(gauges.iL3, Math.random() * 130);

    setGauge(gauges.freq, 49 + Math.random() * 2, true);

  }, 1000);

});