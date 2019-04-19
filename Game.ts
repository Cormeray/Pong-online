import { Ball } from "./Ball";
import { Player } from"./Player";
export class Game{
    initialised : boolean;
    sizeX : number;
    sizeY : number;
    endScore : number;
    end : boolean;
    player1 : Player;
    player2 : Player;
    ball : Ball;
    constructor(){
        this.initialised = false;
        this.sizeX = 700;
        this.sizeY = 400;
        this.endScore = 5;
        this.end = false;
        this.player1 = new Player(50);
        this.player2 = new Player(650);
        this.ball = new Ball();
    }

    resetAfterGoal(x : number){
        this.ball.resetBall(x);
        this.player1.resetSpeed();
        this.player2.resetSpeed();
    }

    movePlayers(){
        this.player1.movePlayer();
        this.player2.movePlayer();
    }

    hasAWinner() : boolean{
        return this.player1.score >= this.endScore || this.player2.score >= this.endScore;
    }
    resetGame(player1found : boolean,player1ready : boolean,player2found : boolean,player2ready: boolean){
        this.player1 = new Player(50);
        this.player1.find = player1found;
        this.player1.ready = player1ready;
        this.player2 = new Player(650);
        this.ball = new Ball();
        this.end = false;
        this.player2.find = player2found;
        this.player2.ready = player2ready;
        this.initialised = true;
    }

    distanceXbetweenPlayerAndBall(player: Player,ball : Ball) : number{
        return Math.abs(player.posX-ball.posX);
    }

    distanceYbetweenPlayerAndBall(player: Player,ball : Ball) : number{
        return Math.abs(player.posY-ball.posY);
    }


    collisionBetweenPlayersAndBall(){
        if(this.player1.height/2+this.ball.size/2>=this.distanceYbetweenPlayerAndBall(this.player1,this.ball) && this.player1.width/2+this.ball.size/2>=this.distanceXbetweenPlayerAndBall(this.player1,this.ball)){
            //game.ball.speedX*=-1;
            let angle = Math.abs(Math.atan(this.ball.speedY/this.ball.speedX)*180/Math.PI);
            //angle=70;
            let speed = Math.sqrt(Math.pow(this.ball.speedX,2)+Math.pow(this.ball.speedY,2))
            let speedX = Math.cos(angle*Math.PI/180)*speed;
            let speedY = Math.sin(angle*Math.PI/180)*speed;
            this.ball.speedX = speedX;
            this.ball.speedY = Math.sign(this.ball.speedY)*speedY;
        }
        if(this.player2.height/2+this.ball.size/2>=this.distanceYbetweenPlayerAndBall(this.player2,this.ball) && this.player2.width/2+this.ball.size/2>=this.distanceXbetweenPlayerAndBall(this.player2,this.ball)){
            //game.ball.speedX*=-1;
            let angle = Math.abs(Math.atan(this.ball.speedY/this.ball.speedX)*180/Math.PI);
            //angle=70;
            let speed = Math.sqrt(Math.pow(this.ball.speedX,2)+Math.pow(this.ball.speedY,2))
            let speedX = Math.cos(angle*Math.PI/180)*speed;
            let speedY = Math.sin(angle*Math.PI/180)*speed;
            this.ball.speedX = -1*speedX;
            this.ball.speedY = Math.sign(this.ball.speedY)*speedY;
        }
    }

    collisionBetweenBallAndWall(){
        if(this.ball.posX+this.ball.size/2>=this.sizeX){
            this.ball.speedX*=-1;
            this.player1.score+=1;
            this.resetAfterGoal(500);
        }
        if(this.ball.posX-this.ball.size/2<=0){
            this.ball.speedX*=-1;
            this.player2.score+=1;
            this.resetAfterGoal(200);
        }
        if(this.ball.posY+this.ball.size/2>=this.sizeY){
            this.ball.speedY*=-1;
        }
        if(this.ball.posY-this.ball.size/2<=0){
            this.ball.speedY *= -1;
        }
    }

    moveBall(){
        this.ball.move();
        this.collisionBetweenBallAndWall();
        this.collisionBetweenPlayersAndBall();
        this.ball.incrementSpeed();
    }
}