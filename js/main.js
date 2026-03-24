document.addEventListener("DOMContentLoaded", () => {
  const gauges = {
    vL1: document.getElementById("vL1"),
    vL2: document.getElementById("vL2"),
    vL3: document.getElementById("vL3"),
    iL1: document.getElementById("iL1"),
    iL2: document.getElementById("iL2"),
    iL3: document.getElementById("iL3"),
    freq: document.getElementById("freq")
  };

  function setGauge(gauge, percent, color = "#0f0") {
    gauge.innerHTML = ''; // limpiar contenido
    const fill = document.createElement('div');
    fill.style.position = 'absolute';
    fill.style.bottom = '0';
    fill.style.width = '100%';
    fill.style.height = percent + '%';
    fill.style.backgroundColor = color;
    gauge.appendChild(fill);
  }

  // Demo: actualizar valores aleatorios cada 1s
  setInterval(() => {
    for (let g in gauges) {
      const val = Math.floor(Math.random() * 100); // 0-100%
      const color = val > 80 ? "#f00" : val > 50 ? "#ff0" : "#0f0";
      setGauge(gauges[g], val, color);
    }
  }, 1000);
});