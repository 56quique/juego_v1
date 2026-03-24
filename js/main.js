document.addEventListener("DOMContentLoaded", () => {

  const gauges = {
    vL1: { el: document.getElementById("vL1"), min: 0, max: 300 },
    vL2: { el: document.getElementById("vL2"), min: 0, max: 300 },
    vL3: { el: document.getElementById("vL3"), min: 0, max: 300 },

    iL1: { el: document.getElementById("iL1"), min: 0, max: 150 },
    iL2: { el: document.getElementById("iL2"), min: 0, max: 150 },
    iL3: { el: document.getElementById("iL3"), min: 0, max: 150 },

    freq: { el: document.getElementById("freq"), min: 45, max: 55 }
  };

  function setGauge(g, value, horizontal = false) {
    const percent = ((value - g.min) / (g.max - g.min)) * 100;

    g.el.innerHTML = `<span>${g.el.querySelector("span")?.innerText || ""}</span>`;

    const fill = document.createElement("div");
    fill.className = "fill";

    if (horizontal) {
      fill.style.width = percent + "%";
    } else {
      fill.style.height = percent + "%";
    }

    // colores tipo SCADA
    if (percent > 80) fill.style.background = "#f00";
    else if (percent > 50) fill.style.background = "#ff0";
    else fill.style.background = "#0f0";

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