const BLACK = "#000000";
const WHITE = "#FFFFFF";
const PINK = "#D966BA";
const ORANGE = "#E6733E";
const BLUE = "#3EABE6";
const GREEN = "#3FD18A";


export class Ball {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} sx
     * @param {number} sy
     * @param {number} charge
     * @param {number} mass
     * @param {CanvasRenderingContext2D} ctx // Add this line
     */
    constructor(x, y, radius, sx, sy, charge, mass, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sx = sx;
        this.sy = sy;
        this.charge = charge;
        this.mass = mass;
        this.ctx = ctx;

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
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        this.ctx.clip();

        this.ctx.fillStyle = this.color1;
        this.ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius, this.radius * 2);

        this.ctx.fillStyle = this.color2;
        this.ctx.fillRect(this.x, this.y - this.radius, this.radius, this.radius * 2);

        this.ctx.restore();
    }
}
