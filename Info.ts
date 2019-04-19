import { Game } from './Game';
class BallInfo{
    posX : number;
    posY : number;
    size : number;
    constructor(posX : number, posY : number, size : number){
        this.posX = posX;
        this.posY = posY;
        this.size = size;
    }
}

class PlayerInfo{
    posX : number;
    posY : number;
    height : number;
    width : number;
    score : number;
    constructor(posX : number, posY : number,height : number, width : number, score : number){
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.score = score;
    }
}

export class Info{
    ball : BallInfo;
    player1 : PlayerInfo;
    player2 : PlayerInfo;

    constructor(game : Game){
        this.ball = new BallInfo(game.ball.posX,game.ball.posY,game.ball.size);
        this.player1 = new PlayerInfo(game.player1.posX,game.player1.posY,game.player1.height,game.player1.width,game.player1.score);
        this.player2 = new PlayerInfo(game.player2.posX,game.player2.posY,game.player2.height,game.player2.width,game.player2.score);
    }

}