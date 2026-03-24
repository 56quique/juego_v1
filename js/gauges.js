export function crearGauge(id, min, max, config = {}) {
  const canvas = document.getElementById(id);
  if (!canvas) {
    console.error("Canvas no encontrado:", id);
    return;
  }

  const ctx = canvas.getContext("2d");

  // =========================
  // CONFIGURACIÓN
  // =========================
  const unidad = config.unidad || "";
  const label = config.label || "";
  const inercia = config.inercia || 0.08;
  let zonas = config.zonas;

  // Si no se pasan zonas, crear una zona "normal"
  if (!zonas || zonas.length === 0) {
    zonas = [{ from: min, to: max, color: "#00ff00" }];
  }

  function resize() {
    const width = canvas.parentElement.offsetWidth || 200;
    canvas.width = width;
    canvas.height = width / 2;
  }

  resize();
  window.addEventListener("resize", resize);

  let valorActual = 0;
  let valorObjetivo = 0;

  // =========================
  // DIBUJAR ZONAS
  // =========================
  function dibujarZona(w, h, inicio, fin, color) {
    const angInicio = Math.PI + ((inicio - min) / (max - min)) * Math.PI;
    const angFin = Math.PI + ((fin - min) / (max - min)) * Math.PI;

    ctx.beginPath();
    ctx.arc(w / 2, h, w / 2 - 10, angInicio, angFin);
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.stroke();
  }

  // =========================
  // DIBUJAR TICKS
  // =========================
  function dibujarTicks(w, h) {
    const cx = w / 2;
    const cy = h;
    const radio = w / 2 - 10;

    // calcular incremento automático según rango
    const rango = max - min;
    const tickMenor = rango <= 100 ? 5 : 10;
    const tickMayor = rango <= 100 ? 25 : 50;

    for (let v = min; v <= max; v += tickMenor) {
      const ang = Math.PI + ((v - min) / (max - min)) * Math.PI;

      const esMayor = v % tickMayor === 0;
      let largo = esMayor ? 14 : 8;
      let grosor = esMayor ? 3 : 1.5;

      const x1 = cx + Math.cos(ang) * (radio - largo);
      const y1 = cy + Math.sin(ang) * (radio - largo);
      const x2 = cx + Math.cos(ang) * radio;
      const y2 = cy + Math.sin(ang) * radio;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#aaa";
      ctx.lineWidth = grosor;
      ctx.stroke();

      if (esMayor) {
        const xt = cx + Math.cos(ang) * (radio - 28);
        const yt = cy + Math.sin(ang) * (radio - 28);
        ctx.fillStyle = "#fff";
        ctx.font = `${Math.round(w * 0.06)}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(v, xt, yt);
      }
    }
  }

  // =========================
  // COLOR DINÁMICO AGUJA
  // =========================
  function colorPorValor(valor) {
    for (let z of zonas) {
      if (valor >= z.from && valor <= z.to) {
        return z.color;
      }
    }
    return "#ffcc00"; // color por defecto
  }

  // =========================
  // DIBUJO PRINCIPAL
  // =========================
  function dibujar(valor) {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    ctx.clearRect(0, 0, w, h);

    // dibujar zonas
    zonas.forEach(z => dibujarZona(w, h, z.from, z.to, z.color));

    // dibujar ticks
    dibujarTicks(w, h);

    const cx = w / 2;
    const cy = h;

    // TEXTO
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.round(w * 0.12)}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(valor.toFixed(0) + " " + unidad, cx, h - 10);

    ctx.fillStyle = "#ccc";
    ctx.font = `bold ${Math.round(w * 0.08)}px Arial`;
    ctx.fillText(label, cx, h - Math.round(w * 0.12 + 10));

    // AGUJA
    const angulo = Math.PI + ((valor - min) / (max - min)) * Math.PI;
    const radio = w / 2 - 20;
    const x = cx + Math.cos(angulo) * radio;
    const y = cy + Math.sin(angulo) * radio;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = colorPorValor(valor);
    ctx.lineWidth = Math.max(2, w * 0.02);
    ctx.lineCap = "round";
    ctx.stroke();

    // CENTRO
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(4, w * 0.02), 0, Math.PI * 2);
    ctx.fillStyle = "#ccc";
    ctx.fill();
  }

  // =========================
  // INERCIA
  // =========================
  function actualizar() {
    valorActual += (valorObjetivo - valorActual) * inercia;
    dibujar(valorActual);
    requestAnimationFrame(actualizar);
  }

  actualizar();

  return {
    set(valor) {
      valorObjetivo = valor;
    }
  };
}
