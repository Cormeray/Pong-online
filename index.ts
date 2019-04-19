import { Game } from "./GameData/Game";
import { Info } from "./GameData/Info";
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/',function(req : any,res : any){
    res.sendFile(path.join(__dirname,'./clientFile/index.html'));
});

app.get('/display',function(req : any,res : any){
    res.sendFile(path.join(__dirname,'./clientFile/gameClient.js'));
});

app.get('/keycode',function(req : any,res : any){
    res.sendFile(path.join(__dirname,'./clientFile/game.keycode.js'));
});


let player1 : any;
let player2 : any;
let game = new Game();
let gameEnd = function(){
    if(game.hasAWinner()){
        if(Math.abs(game.player1.score-game.player2.score)<=1){
            game.endScore +=1;
        }
        else{
            game.end = true;
            game.player1.ready = false;
            game.player2.ready = false;
            game.initialised = false;
        }
    }
}

let movePlayers = function(){
    game.movePlayers();
}

let moveBall = function(){
    game.moveBall();
}

let init = function(){
    game.resetGame(game.player1.find,game.player1.ready,game.player2.find,game.player2.ready);
}
let gameInfo = function() : Info{
    let info : Info = new Info(game);
    return info;
}
let play = function(){
    if(!game.end){
        moveBall();
        movePlayers();
        io.emit("render",gameInfo());
        gameEnd();
        setTimeout(play, 1000/60);
    }
    else{
        io.emit('gameEnd',game);
    }
}

io.on('connection',function(socket : any){
    if(!game.player1.find){
        player1 = socket;
        player1.emit('launch',{});
        game.player1.find = true;
        player1.on('disconnect',(msg : any)=>{
            game.player1.find = false;
            player1.disconnect(true);
        });
        player1.on('moveData',(data : any)=>{
            if(data && data !== undefined){
                game.player1.goUp = data.goUp;
            }
            if(data && data.goDown !== undefined){
                game.player1.goDown = data.goDown;
            }
        });
        player1.on('ready',(msg:any)=>{
            game.player1.ready=true;
            if(game.player2.ready){
                if(!game.initialised){
                    init();
                    play();
                }
            }
            else{
                player1.emit('wait',{});
            }
        });
    }
    else if(!game.player2.find){
        player2 = socket;
        game.player2.find = true;
        player2.emit('launch',{});
        player2.on('disconnect',(msg : any)=>{
            game.player2.find=false;
            player2.disconnect(true);
        });
        player2.on('moveData',(data : any)=>{
            if(data && data.goUp !== undefined){
                game.player2.goUp = data.goUp;
            }
            if(data && data.goDown !== undefined){
                game.player2.goDown = data.goDown;
            }
        });
        player2.on('ready',(msg : any)=>{
            game.player2.ready=true;
            if(game.player1.ready){
                if(!game.initialised){
                    init();
                    play();
                }
            }
            else{
                player2.emit('wait',{});
            }
        });
    }
});


http.listen(8080,function(){});