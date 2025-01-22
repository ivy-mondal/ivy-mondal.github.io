export class Game{
    constructor(canvas, ctx, balls) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.balls = balls;
    }

    update(){
        this.moveBalls();
        this.bounceBalls();
        this.checkCollisions();
        this.drawBalls();

    }

    moveBalls(){
        this.balls.forEach(ball => ball.move());
    }

    bounceBalls() {
        this.balls.forEach(ball => {
            if (
                ball.x + ball.radius > this.canvas.width ||
                ball.x - ball.radius < 0
            ) {
                ball.sx = -ball.sx;
            }
            if (
                ball.y + ball.radius > this.canvas.height ||
                ball.y - ball.radius < 0
            ) {
                ball.sy = -ball.sy;
            }
        });
    }


    //respawnBall(ball){
        //ball.x = Math.random() * this.canvas.width;
        //ball.y = Math.random() * this.canvas.height;
        //ball.sx = (Math.random() * 2 - 1) * 5;
        //ball.sy = (Math.random() * 2 - 1) * 5;
    //}

    drawBalls(){
        this.balls.forEach(ball => ball.draw());
    }

    checkCollisions(){
        for (let i = 0; i < this.balls.length; i ++){
            for (let j = i + 1; j < this.balls.length; j++){
                this.balls[i].checkCollisions(this.balls[j]);
                this.balls[i].speedChangeForCharge(this.balls[j]);
            }
        }
    }




}