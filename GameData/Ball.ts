export class Ball{
    posX : number;
    posY : number;
    speedX : number;
    speedY : number;
    directionX : number;
    directionY : number;
    size : number;
    constructor(){
        this.posX = 350;
        this.posY = 200;
        this.speedX = 3;
        this.speedY = 3;
        this.directionX = 1;
        this.directionY = 1;
        this.size = 10;
    }

    resetBall(x : number){
        this.posX = x;
        this.posY = 200;
        this.speedX = 3 * Math.sign(this.speedX);
        this.speedY = 3;
    }
    
    move(){
        this.posX+=this.speedX;
        this.posY+=this.speedY;
    }

    incrementSpeed(){
        this.speedX+=0.002*Math.sign(this.speedX);
        this.speedY+=0.002*Math.sign(this.speedY);
    }
}