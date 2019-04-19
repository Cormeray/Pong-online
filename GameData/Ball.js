"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ball = /** @class */ (function () {
    function Ball() {
        this.posX = 350;
        this.posY = 200;
        this.speedX = 3;
        this.speedY = 3;
        this.directionX = 1;
        this.directionY = 1;
        this.size = 10;
    }
    Ball.prototype.resetBall = function (x) {
        this.posX = x;
        this.posY = 200;
        this.speedX = 3 * Math.sign(this.speedX);
        this.speedY = 3;
    };
    Ball.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
    };
    Ball.prototype.incrementSpeed = function () {
        this.speedX += 0.002 * Math.sign(this.speedX);
        this.speedY += 0.002 * Math.sign(this.speedY);
    };
    return Ball;
}());
exports.Ball = Ball;
