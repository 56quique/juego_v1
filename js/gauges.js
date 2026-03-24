export function crearGauge(id, min, max, label = "") {
  const canvas = document.getElementById(id)

  if (!canvas) {
    console.error("Canvas no encontrado:", id)
    return
  }

  const ctx = canvas.getContext("2d")

  function resize() {
    const width = canvas.parentElement.offsetWidth || 200
    canvas.width = width
    canvas.height = width / 2
  }

  resize()
  window.addEventListener("resize", resize)

  let valorActual = 0
  let valorObjetivo = 0

  function dibujarZona(w, h, inicio, fin, color) {
    const angInicio = Math.PI + (inicio - min) / (max - min) * Math.PI
    const angFin = Math.PI + (fin - min) / (max - min) * Math.PI

    ctx.beginPath()
    ctx.arc(w/2, h, w/2 - 10, angInicio, angFin)
    ctx.strokeStyle = color
    ctx.lineWidth = 10
    ctx.stroke()
  }

  function dibujarTicks(w, h) {
  const cx = w/2
  const cy = h
  const radio = w/2 - 10

  for (let v = min; v <= max; v += 10) { // ahora cada 10
    const ang = Math.PI + (v - min) / (max - min) * Math.PI

    // definir si es tick mayor o menor
    const esMayor = (v % 40 === 0)
    const esMedio = (v % 20 === 0)

    let largo = 6
    let grosor = 1

    if (esMayor) {
      largo = 14
      grosor = 3
    } else if (esMedio) {
      largo = 10
      grosor = 2
    }

    const x1 = cx + Math.cos(ang) * (radio - largo)
    const y1 = cy + Math.sin(ang) * (radio - largo)

    const x2 = cx + Math.cos(ang) * radio
    const y2 = cy + Math.sin(ang) * radio

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = "#aaa"
    ctx.lineWidth = grosor
    ctx.stroke()

    // SOLO números en ticks mayores
    if (esMayor) {
      const xt = cx + Math.cos(ang) * (radio - 25)
      const yt = cy + Math.sin(ang) * (radio - 25)

      ctx.fillStyle = "#fff"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(v, xt, yt)
    }
  }
}
  function dibujar(valor) {
    const w = canvas.width
    const h = canvas.height

    if (w === 0 || h === 0) return

    ctx.clearRect(0, 0, w, h)

    // zonas
    dibujarZona(w, h, 0, 210, "#d9534f")
    dibujarZona(w, h, 210, 240, "#5cb85c")
    dibujarZona(w, h, 240, 300, "#d9534f")

    // ticks
    dibujarTicks(w, h)

    const cx = w/2
    const cy = h

    // valor principal
    ctx.fillStyle = "#fff"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(valor.toFixed(0) + " V", cx, h - 15)

    // etiqueta (L1, L2, etc)
    ctx.fillStyle = "#ccc"
    ctx.font = "bold 14px Arial"
    ctx.fillText(label, cx, h - 35)

    // aguja
    const angulo = Math.PI + (valor - min) / (max - min) * Math.PI
    const radio = w/2 - 20

    const x = cx + Math.cos(angulo) * radio
    const y = cy + Math.sin(angulo) * radio

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#ffcc00"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
    ctx.stroke()

    // centro
    ctx.beginPath()
    ctx.arc(cx, cy, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#ccc"
    ctx.fill()
  }

  function actualizar() {
    valorActual += (valorObjetivo - valorActual) * 0.1
    dibujar(valorActual)
    requestAnimationFrame(actualizar)
  }

  actualizar()

  return {
    set(valor) {
      valorObjetivo = valor
    }
  }
}
