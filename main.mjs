import { Ball } from './ball.mjs';
import {Game} from './game.mjs'


const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 600;
document.body.appendChild(canvas);




const balls = [
    new Ball(100, 50, 20, 3, 3, 1, 1, ctx),
    new Ball(200, 20, 20, 3, 3, -1, 1, ctx),
];

const game = new Game(canvas, ctx, balls);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
    ctx.fillStyle = "#1A287A"; // Set the background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the color

    game.update();

    requestAnimationFrame(animate);
}

animate();


