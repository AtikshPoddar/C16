var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  //T-Rex Animation
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  //Ground
  groundImage = loadImage("ground2.png");
  
  //Cloud
  cloudImage = loadImage("cloud.png");
  
  //Cacti
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  //Game Over Screen
  end = loadImage("gameOver.png");
  reset = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  //T-Rext Animation Being Set
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  //Ground Being Set
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  //GameOver Being Set
  Done = createSprite(300, 75);
  Done.addImage(end);
  Done.scale=0.75  

  //Restart Button Being Set
  GreatReset = createSprite(300, 115);
  GreatReset.addImage(reset);
  GreatReset.scale=0.5

  //Ground Border Being Set
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //Obstacles and Clouds being made into groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  //logging to console
  console.log("Hello" + 5);
  
  //Setting The Score
  score = 0;
}

function draw() {
  background(180);
  
  //Setting The Score
  text("Score: "+ score, 500,50);
  
  //When The Game Is Being Played
  if(gameState === PLAY){
      
    //Ground Moving
    ground.velocityX = -4;
   
    //Adding Score
    score = score + Math.round(frameCount/60);
    
    //Moving Ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //T-Rex Pbeing pulled down
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //T-Rex Jumping
    trex.velocityY = trex.velocityY + 0.8
  
    //Summoning Clouds
    spawnClouds();
  
    //Summoning Cacti
    spawnObstacles();

    //Making The Resrart Screen Invisible
    Done.visible=false;
    GreatReset.visible=false;
    
    //Game Ending
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }

  //When Game Ends
   else if (gameState === END) {
       
    //Stopping Ground From Moving
      ground.velocityX = 0;
     
      //Stopping Clouds And Cacti From Moving
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);

     //Showing Restart Screen
      Done.visible=true;
      GreatReset.visible=true;

   }
  

  //Making The T-Rex Run On The Ground
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

//Spawning Cacti
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //Setting The Size Of The Cacti
    obstacle.scale = 0.5;

    //Setting A Lifetime For The Cacti
    obstacle.lifetime = 300;
   
    //Putting The Cacti Into Groups
    obstaclesGroup.add(obstacle);
 }
}

//Spawning Clouds
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //Giving The Clouds A Lifetime
    cloud.lifetime = 134;
    
    //Making The Trex Infront Of The Clouds When It Jumps
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //Putting The Clouds Into A Group
   cloudsGroup.add(cloud);
    }
}

