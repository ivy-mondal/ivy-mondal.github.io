const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const BLACK = "#000000";
const WHITE = "#FFFFFF";
const PINK = "#D966BA";
const ORANGE = "#E6733E";
const BLUE = "#3EABE6";
const GREEN = "#3FD18A";

class Ball {
    constructor(x, y, radius, sx, sy, charge, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sx = sx;
        this.sy = sy;
        this.charge = charge;
        this.mass = mass;

        if (charge > 0) {
            this.color1 = Math.random() < 0.5 ? ORANGE : PINK;
            this.color2 = WHITE;
        } else if (charge < 0) {
            this.color1 = Math.random() < 0.5 ? BLUE : GREEN;
            this.color2 = WHITE;
        } else {
            this.color1 = BLACK;
            this.color2 = WHITE;
        }
    }
    move() {
        this.x += this.sx;
        this.y += this.sy;
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.clip();

        ctx.fillStyle = this.color1;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius, this.radius * 2);

        ctx.fillStyle = this.color2;
        ctx.fillRect(this.x, this.y - this.radius, this.radius, this.radius * 2);

        ctx.restore();
    }
}

const balls = [
    new Ball(100, 50, 20, 3, 3, 1, 1),
    new Ball(100, 100, 40, 1, 1, 2, 3),
    new Ball(200, 200, 20, 3, 3, -1, 1),
    new Ball(200, 400, 40, 1, 1, -2, 3),
    new Ball(300, 200, 30, 2, 2, 0, 2)
];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
    ctx.fillStyle = "#1A287A"; // Set the background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the color

    balls.forEach(ball => {
        ball.move();
        ball.draw();
    });

    requestAnimationFrame(animate);
}

animate();
