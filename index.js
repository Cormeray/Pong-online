"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var Info_1 = require("./Info");
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var player1;
var player2;
var game = new Game_1.Game();
var gameEnd = function () {
    if (game.hasAWinner()) {
        if (Math.abs(game.player1.score - game.player2.score) <= 1) {
            game.endScore += 1;
        }
        else {
            game.end = true;
            game.player1.ready = false;
            game.player2.ready = false;
            game.initialised = false;
        }
    }
};
var movePlayers = function () {
    game.movePlayers();
};
var moveBall = function () {
    game.moveBall();
};
var init = function () {
    game.resetGame(game.player1.find, game.player1.ready, game.player2.find, game.player2.ready);
};
var gameInfo = function () {
    var info = new Info_1.Info(game);
    return info;
};
var play = function () {
    if (!game.end) {
        moveBall();
        movePlayers();
        io.emit("render", gameInfo());
        gameEnd();
        setTimeout(play, 1000 / 60);
    }
    else {
        io.emit('gameEnd', game);
    }
};
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/display', function (req, res) {
    res.sendFile(path.join(__dirname, 'gameClient.js'));
});
app.get('/keycode', function (req, res) {
    res.sendFile(path.join(__dirname, 'game.keycode.js'));
});
io.on('connection', function (socket) {
    if (!game.player1.find) {
        player1 = socket;
        player1.emit('launch', {});
        //game.player1.ready = false;
        game.player1.find = true;
        player1.on('disconnect', function (msg) {
            //game.player1.ready=false;
            game.player1.find = false;
            player1.disconnect(true);
        });
        player1.on('moveData', function (data) {
            if (data && data !== undefined) {
                game.player1.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player1.goDown = data.goDown;
            }
        });
        player1.on('ready', function (msg) {
            game.player1.ready = true;
            if (game.player2.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player1.emit('wait', {});
            }
        });
    }
    else if (!game.player2.find) {
        player2 = socket;
        game.player2.find = true;
        player2.emit('launch', {});
        //game.player2.ready = false;
        player2.on('disconnect', function (msg) {
            //game.player2.ready=false;
            game.player2.find = false;
            player2.disconnect(true);
            //player2=undefined;
        });
        player2.on('moveData', function (data) {
            if (data && data.goUp !== undefined) {
                game.player2.goUp = data.goUp;
            }
            if (data && data.goDown !== undefined) {
                game.player2.goDown = data.goDown;
            }
        });
        player2.on('ready', function (msg) {
            game.player2.ready = true;
            if (game.player1.ready) {
                if (!game.initialised) {
                    init();
                    play();
                }
            }
            else {
                player2.emit('wait', {});
            }
        });
    }
});
http.listen(8080, function () { });
