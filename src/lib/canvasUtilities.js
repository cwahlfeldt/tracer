import { CTX } from './consts'

export function getMousePos(event) {
    const canvas = CTX.canvas
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const transform = CTX.getTransform()
    const invMat = transform.invertSelf()

    return {
        x: x * invMat.a + y * invMat.c + invMat.e,
        y: x * invMat.b + y * invMat.d + invMat.f,
    }
}

export function drawCircle(
    CTX,
    x = 0,
    y = 0,
    color = 'black',
    radius = 20,
    strokeWidth = 0
) {
    CTX.beginPath()
    CTX.arc(x, y, radius, 0, 2 * Math.PI, false)
    CTX.fillStyle = color
    CTX.fill()
    CTX.lineWidth = strokeWidth
    CTX.strokeStyle = color
    CTX.stroke()
    CTX.closePath()
}
