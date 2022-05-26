import {drawCircle} from "../lib/canvasUtilities.js";

export default function enemyPiece(ctx, location) {
    drawCircle(ctx, location.x, location.y, 'red')
}