"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(posX) {
        this.find = false;
        this.ready = false;
        this.posX = posX;
        this.posY = 200;
        this.score = 0;
        this.goUp = false;
        this.goDown = false;
        this.speed = 8;
        this.width = 5;
        this.height = 100;
    }
    Player.prototype.resetSpeed = function () {
        this.speed = 8;
    };
    Player.prototype.movePlayer = function () {
        if (this.goUp) {
            this.posY -= this.speed;
        }
        else if (this.goDown) {
            this.posY += this.speed;
        }
    };
    return Player;
}());
exports.Player = Player;
