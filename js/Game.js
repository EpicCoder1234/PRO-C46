class Game{
    constructor(){

    }
    getState(){
        database.ref("gameState").on("value",function(data){
            gameState = data.val();
        });
        return gameState
    }
    updateState(data){
        database.ref('/').update({
            gameState:data,
        });
    }
    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            //player.getPlayerCount();
          }
          form = new Form()
          form.display();
        }
        ship1 = createSprite(100,200);
        ship2 = createSprite(300,200);
        ship3 = createSprite(500,200);
        ship1.addImage("ship1",ship1IMG);
        ship2.addImage("ship2",ship2IMG);
        ship3.addImage("ship3",ship3IMG);
        ship1.scale = 0.1;
        ship2.scale = 0.1;
        ship3.scale = 0.1;
        ships = [ship1,ship2,ship3];
    }

play(){
    form.hide();
    Player.getPlayerInfo();
    console.log(allPlayers)
    if(allPlayers !== undefined){
      background("skyblue");
      //image(sea,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y = 50;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 300;
        //use data form the database to display the cars in y direction
        x = allPlayers[plr].xpos;
        ships[index-1].x = x;
        ships[index-1].y = y;

        if (index === player.index){
          fill("red");
          strokeWeight(3);
          ships[index-1].shapeColor = "red"
          //ellipse(ships[index-1].x,ships[index-1].y,60,60);
          //camera.position.x = ships[index-1].y;
          //camera.position.y = displayWidth/2; 
        }
      }
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.xpos +=10
        player.updateName();
      }
    if(keyIsDown(UP_ARROW)&& player.index !== null){
      player.ypos -= 10;
      player.updateName();
    }
    if(keyIsDown(DOWN_ARROW)&& player.index !== null){
      player.ypos += 10;
      player.updateName();
    }
    if(ship1.isTouching(ship2)){
      ship1.destroy();
      ship2.destroy();
    }
    if(ship1.isTouching(ship3)){
      ship1.destroy();
      ship3.destroy();
    }
    if(ship2.isTouching(ship3)){
      ship3.destroy();
      ship2.destroy();
    }

      if(player.xpos>3900){
        gameState = 2;
      }
  
      drawSprites();
    }
    end(){
      alert("Game Over");
    }
  }