game.control = {

  controlSystem : null,
  mousePointer : null,
   
  onKeyDown : function(event) {
    if(!game.gameEnd){
		game.control.controlSystem = "KEYBOARD";
		if ( event.keyCode == game.keycode.KEYDOWN ) { 
		game.playerOne.goDown = true;
		} else if ( event.keyCode == game.keycode.KEYUP ) { 
		game.playerOne.goUp = true;
		}
		else if(event.keyCode === game.keycode.player2Up){
			game.playerTwo.goUp = true;
		}
		else if(event.keyCode === game.keycode.player2Down){
			game.playerTwo.goDown = true;
		}
	}
  },
   
  onKeyUp : function(event) {
	if(!game.gameEnd){
		if ( event.keyCode == game.keycode.KEYDOWN ) {
		  game.playerOne.goDown = false;
		} else if ( event.keyCode == game.keycode.KEYUP ) {
		game.playerOne.goUp = false;
		}
		else if(event.keyCode === game.keycode.player2Up){
			game.playerTwo.goUp = false;
		}
		else if(event.keyCode === game.keycode.player2Down){
			game.playerTwo.goDown = false;
		}
	}
	else{
		game.replay();
	}
  },
   
  // onMouseMove : function(event) {
  
    // game.control.controlSystem = "MOUSE";
	
    // if ( event ) {
      // game.control.mousePointer = event.clientY;
    // }
 
    // if ( game.control.mousePointer > game.playerOne.posY ) {
      // game.playerOne.goDown = true;
      // game.playerOne.goUp = false;
    // } else if ( game.control.mousePointer < game.playerOne.posY ) {
      // game.playerOne.goDown = false;
      // game.playerOne.goUp = true;
    // } else {
      // game.playerOne.goDown = false;
      // game.playerOne.goUp = false;
    // }
  // }
 
}