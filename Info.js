"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BallInfo = /** @class */ (function () {
    function BallInfo(posX, posY, size) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
    }
    return BallInfo;
}());
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo(posX, posY, height, width, score) {
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.score = score;
    }
    return PlayerInfo;
}());
var Info = /** @class */ (function () {
    function Info(game) {
        this.ball = new BallInfo(game.ball.posX, game.ball.posY, game.ball.size);
        this.player1 = new PlayerInfo(game.player1.posX, game.player1.posY, game.player1.height, game.player1.width, game.player1.score);
        this.player2 = new PlayerInfo(game.player2.posX, game.player2.posY, game.player2.height, game.player2.width, game.player2.score);
    }
    return Info;
}());
exports.Info = Info;
