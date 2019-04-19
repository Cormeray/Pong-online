
export class Player{
    find : boolean;
    ready : boolean;
    posX : number;
    posY : number;
    score : number;
    goUp : boolean;
    goDown : boolean;
    speed : number;
    width : number;
    height : number;
    constructor(posX : number){
        this.find = false;
        this.ready = false;
        this.posX = posX
        this.posY = 200;
        this.score = 0;
        this.goUp = false;
        this.goDown = false;
        this.speed = 8;
        this.width = 5;
        this.height = 100;
    }

    resetSpeed(){
        this.speed = 8;
    }

    movePlayer(){
        if(this.goUp){
            this.posY-=this.speed;
        }
        else if(this.goDown){
            this.posY+=this.speed;
        }
    }
}