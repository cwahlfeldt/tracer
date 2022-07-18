import {drawCircle} from "../lib/canvasUtilities.js";
import { CTX } from "../lib/consts.js";

export default function playerPiece(location) {
    drawCircle(CTX, location.x, location.y, 'cyan')
}
