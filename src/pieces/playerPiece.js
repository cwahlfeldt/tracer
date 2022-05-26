import {drawCircle} from "../lib/canvasUtilities.js";

export default function playerPiece(ctx, location) {
    drawCircle(ctx, location.x, location.y, 'cyan')
}