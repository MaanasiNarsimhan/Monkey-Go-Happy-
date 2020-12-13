
var monkey , monkey_running, monkeyPic
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var bg, bgPic ;
var ground, groundPic ; 
var gameState = 1
var bananaGroup ; 


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  
 groundPic = loadImage("ground2.png")
  
  obstacleImage = loadImage ("rock.png")
 
  monkeyPic = loadAnimation ("sprite_1.png")
  
}



function setup() {
  
  createCanvas (400,300) ; 
  
  monkey = createSprite (70,150,30,30) ;
  monkey.addAnimation ("monkey1",monkey_running);
  monkey.addAnimation ("monkeyEnd", monkeyPic)
  monkey.scale = 0.13
  
  ground = createSprite (200,200,800,400)
  ground.addImage ("ground1", groundPic)
  ground.scale = 1.7
  ground.x = ground.width /2;
  
  ground.debug = true ;
  ground.setCollider("rectangle",0,0,800,25);
  
obstacle = createSprite (440,160,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.21
  obstacle.debug = true ;
  obstacle.setCollider ("rectangle", 0,0,70,70)

  
  obstacleGroup = createGroup  () ;
  bananaGroup = createGroup ();
  
  score = 0 
  
}


function draw() {
  
background (220)
  
  //text.fill ("black")
  text ("score : "+ score , 180, 50)
  
  
  monkey.depth = ground.depth
  monkey.depth = monkey.depth + 1
  
  monkey.velocityY = 0 
  
  if (gameState === 1){
    
    
    if (keyDown ("space") && monkey.y>= 100) {
      
      monkey.velocityY = -50
       }
    
    monkey.velocityY = monkey.velocityY + 5
    
  monkey.bounceOff(ground)
    
    ground.velocityX = -3
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (frameCount%70 === 0) {
      obstacleFunction ();
      bananaFunction () ;
    }
    
    if (obstacleGroup.isTouching(monkey)){
      
      gameState = 2 
      
      }
    if (bananaGroup.isTouching(monkey)){
      
      bananaGroup.destroyEach()      
      score = score +  1
      
    }
    
    
      
    
  }  
  if (gameState === 2)  {
      
      obstacleGroup.setVelocityXEach (0) ;
      bananaGroup.setVelocityXEach (0);
      monkey.velocityX = 0 
      ground.velocityX = 0 
      
      monkey.changeAnimation( "monkeyEnd",monkeyPic)
      
    }
      
  
  drawSprites();
}

function obstacleFunction () {
  
  obstacle.x = 440
  obstacle.velocityX = - 10
  
  obstacleGroup.add(obstacle) ;
}

function bananaFunction () {
  
  
  banana = createSprite (obstacle.x, obstacle.y - 50,30,30)
  banana.addImage(bananaImage)
  banana.velocityX = - 10 
  banana.scale = 0.08
  
  bananaGroup.add(banana) ;
}

