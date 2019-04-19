"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ball_1 = require("./Ball");
var Player_1 = require("./Player");
var Game = /** @class */ (function () {
    function Game() {
        this.initialised = false;
        this.sizeX = 700;
        this.sizeY = 400;
        this.endScore = 5;
        this.end = false;
        this.player1 = new Player_1.Player(50);
        this.player2 = new Player_1.Player(650);
        this.ball = new Ball_1.Ball();
    }
    Game.prototype.resetAfterGoal = function (x) {
        this.ball.resetBall(x);
        this.player1.resetSpeed();
        this.player2.resetSpeed();
    };
    Game.prototype.movePlayers = function () {
        this.player1.movePlayer();
        this.player2.movePlayer();
    };
    Game.prototype.hasAWinner = function () {
        return this.player1.score >= this.endScore || this.player2.score >= this.endScore;
    };
    Game.prototype.resetGame = function (player1found, player1ready, player2found, player2ready) {
        this.player1 = new Player_1.Player(50);
        this.player1.find = player1found;
        this.player1.ready = player1ready;
        this.player2 = new Player_1.Player(650);
        this.ball = new Ball_1.Ball();
        this.end = false;
        this.player2.find = player2found;
        this.player2.ready = player2ready;
        this.initialised = true;
    };
    Game.prototype.distanceXbetweenPlayerAndBall = function (player, ball) {
        return Math.abs(player.posX - ball.posX);
    };
    Game.prototype.distanceYbetweenPlayerAndBall = function (player, ball) {
        return Math.abs(player.posY - ball.posY);
    };
    Game.prototype.collisionBetweenPlayersAndBall = function () {
        if (this.player1.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player1, this.ball) && this.player1.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player1, this.ball)) {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
        if (this.player2.height / 2 + this.ball.size / 2 >= this.distanceYbetweenPlayerAndBall(this.player2, this.ball) && this.player2.width / 2 + this.ball.size / 2 >= this.distanceXbetweenPlayerAndBall(this.player2, this.ball)) {
            //game.ball.speedX*=-1;
            var angle = Math.abs(Math.atan(this.ball.speedY / this.ball.speedX) * 180 / Math.PI);
            //angle=70;
            var speed = Math.sqrt(Math.pow(this.ball.speedX, 2) + Math.pow(this.ball.speedY, 2));
            var speedX = Math.cos(angle * Math.PI / 180) * speed;
            var speedY = Math.sin(angle * Math.PI / 180) * speed;
            this.ball.speedX = -1 * speedX;
            this.ball.speedY = Math.sign(this.ball.speedY) * speedY;
        }
    };
    Game.prototype.collisionBetweenBallAndWall = function () {
        if (this.ball.posX + this.ball.size / 2 >= this.sizeX) {
            this.ball.speedX *= -1;
            this.player1.score += 1;
            this.resetAfterGoal(500);
        }
        if (this.ball.posX - this.ball.size / 2 <= 0) {
            this.ball.speedX *= -1;
            this.player2.score += 1;
            this.resetAfterGoal(200);
        }
        if (this.ball.posY + this.ball.size / 2 >= this.sizeY) {
            this.ball.speedY *= -1;
        }
        if (this.ball.posY - this.ball.size / 2 <= 0) {
            this.ball.speedY *= -1;
        }
    };
    Game.prototype.moveBall = function () {
        this.ball.move();
        this.collisionBetweenBallAndWall();
        this.collisionBetweenPlayersAndBall();
        this.ball.incrementSpeed();
    };
    return Game;
}());
exports.Game = Game;
