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

    checkCollisions(other){
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt((dx) ** 2 + (dy) ** 2);
        if (distance <= this.radius + other.radius){
            const overlap = (this.radius + other.radius) - distance;
            const normalizeX = dx/distance;
            const normalizeY = dy/distance;

            this.x += normalizeX * (overlap / 2);
            this.y += normalizeY * (overlap / 2);
            other.x -= normalizeX * (overlap / 2);
            other.y -= normalizeY * (overlap / 2);

            this.updateSpeed(other, normalizeX, normalizeY)

        }

    }

    updateSpeed(other, normalizeX, normalizeY){
        const u1 = this.sx * normalizeX + this.sy * normalizeY;
        const u2 = other.sx * normalizeX + other.sy * normalizeY;
        const totalMass = this.mass + other.mass

        const v1 = (u1 * (this.mass - other.mass) + 2 * other.mass * u2) / totalMass;
        const v2 = (u2 * (other.mass - this.mass) + 2 * this.mass * u1) / totalMass;

        this.checkKineticEnergy(other, u1, u2, v1, v2);

        //const tangentX = -normalizeY;
        //const tangentY = normalizeX;
        const ut1 = this.sx * -normalizeY + this.sy * normalizeX;
        const ut2 = other.sx * -normalizeY + other.sy * normalizeX;

        this.sx = v1 * normalizeX + ut1 * -normalizeY;
        this.sy = v1 * normalizeY + ut1 * normalizeX;
        other.sx = v2 * normalizeX + ut2 * -normalizeY;
        other.sy = v2 * normalizeY + ut2 * normalizeX;
    }

    checkKineticEnergy(other, u1, u2, v1, v2) {
        const beforeKE = (0.5 * this.mass * u1 * u1) + (0.5 * other.mass * u2 * u2);
        const afterKE = (0.5 * this.mass * v1 * v1) + (0.5 * other.mass * v2 * v2);

        const tolerance = 0.01;
        const value = Math.abs(beforeKE - afterKE) ;
        const isConserved = Math.abs(beforeKE - afterKE) < tolerance;

        if (!isConserved) {
            console.log("Kinetic energy is NOT conserved! 😱" + value);
        } else {
            console.log("Kinetic energy is conserved. 🎉" + value);
        }
        return isConserved;
    }


}
