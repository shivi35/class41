class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }
}

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getRankCount();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;     
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
  

    if(player.distance >= 3860){
     // gameState = 2;
     rankCount++
     player.rank=rankCount
     player.update();
     player.updaterankCount(rankCount);

    }
  }
  if(player.rank===1){
    stroke("green")
    strokeWeight(5)
    textSize(40);
    fill("blue")
    text("CONGRATULATIONS"+player.name+"you are the winner",displayWidth/5,-displayHeight*4-80)
    textSize(25);
    text("rank:"+player.rank,displayWidth/2-50,displayHeight*4-30)
    
  }
  else if(player.rank>1){
  textSize(25)
  text(player.name+"your rank is "+player.rank,displayWidth/2,-displayHeight*4-30)
  }
   drawSprites();
 
 
  }

  end(){
    background("purple")
    var plr
    Player.getPlayerInfo()
    if(allPlayers!==undefine){
      var display_position=50
      textSize(60)
      fill("black")
      stroke("green")
      text("Leader Board",displaWwidth/3,-displayHeight*4-200)
      for(var plr in allPlayers){
        displyposition+=70
        p=createElement("h1",allPlayers[plr].name +"rank"+allPlayers[plr].rank)
        p.position(displayWidth/3,display_position)
      }
    }
   
  }
}
