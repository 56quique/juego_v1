export function crearGauge(id, min, max) {
  const canvas = document.getElementById(id)
  const ctx = canvas.getContext("2d")

  let valorActual = 0
  let valorObjetivo = 0

  function dibujar(valor) {
    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)

    // fondo
    ctx.beginPath()
    ctx.arc(w/2, h, w/2 - 10, Math.PI, 0)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 10
    ctx.stroke()

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
    // inercia (suavizado)
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
