export function crearGauge(id, min, max) {
  const canvas = document.getElementById(id)
  const ctx = canvas.getContext("2d")

  function resize() {
    const width = canvas.parentElement.offsetWidth

    canvas.width = width
    canvas.height = width / 2 // semicircular perfecto
  }

  resize()
  window.addEventListener("resize", resize)

  let valorActual = 0
  let valorObjetivo = 0

  function dibujar(valor) {
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    dibujarZona(0, 210, "#d9534f")   // rojo suave
dibujarZona(210, 240, "#5cb85c") // verde industrial
dibujarZona(240, 300, "#d9534f")

    // arco base
    function dibujarZona(inicio, fin, color) {
  const angInicio = Math.PI + (inicio - min) / (max - min) * Math.PI
  const angFin = Math.PI + (fin - min) / (max - min) * Math.PI

  ctx.beginPath()
  ctx.arc(w/2, h, w/2 - 10, angInicio, angFin)
  ctx.strokeStyle = color
  ctx.lineWidth = 10
  ctx.stroke()
}

    // aguja
    const angulo = Math.PI + (valor - min) / (max - min) * Math.PI
    const x = w/2 + Math.cos(angulo) * (w/2 - 20)
    const y = h + Math.sin(angulo) * (w/2 - 20)

    ctx.beginPath()
    ctx.moveTo(w/2, h)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "red"
    ctx.lineWidth = 3
    ctx.stroke()
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
