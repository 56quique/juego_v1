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
    const barra = gauge;
    barra.style.setProperty('--value', percent + '%');
    barra.querySelector('::after')?.remove();
    barra.style.height = "auto";
    const pseudo = document.createElement('div');
    pseudo.style.position = 'absolute';
    pseudo.style.bottom = '0';
    pseudo.style.width = '100%';
    pseudo.style.height = percent + '%';
    pseudo.style.backgroundColor = color;
    barra.appendChild(pseudo);
  }

  // Demo: actualizar valores cada 1s
  setInterval(() => {
    for (let g in gauges) {
      const val = Math.floor(Math.random() * 100); // 0-100%
      const color = val > 80 ? "#f00" : val > 50 ? "#ff0" : "#0f0";
      const barra = gauges[g];
      // limpiar pseudo anteriores
      barra.innerHTML = '';
      const fill = document.createElement('div');
      fill.style.position = 'absolute';
      fill.style.bottom = '0';
      fill.style.width = '100%';
      fill.style.height = val + '%';
      fill.style.backgroundColor = color;
      barra.appendChild(fill);
    }
  }, 1000);
});