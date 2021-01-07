// for sword and sword image
var sword,swordimg;
//for gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//for adding image in fruits
var fruit1,fruit2,fruit3,fruit4;
//for score
var score;
//for fruitsgroup and enemygroup
var fruitGroup,enemyGroup;
//for adding image in monster
var monsterimg,monsterimg2;
//for monstergroup and enemygroup
var fruitsGroup,enemyGroup;
//for adding gameOver image
var gameOverImage;
//for adding gameover sound
var gameOverSound;
//for making background
var fruit_board,fruit_boardimg;

function preload(){
  //for loading sword image
  swordimg = loadImage("sword.png");
 
  //for loading fruits image
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  //for loading monster image
  monsterimg = loadImage("alien1.png");
  monsterimg2 = loadImage("alien2.png");
  
  //for loading gameover image
  gameOverImage = loadImage("gameover.png");
  
  //for loading gameover sound
  gameOverSound = loadSound("mixkit-funny-fail-low-tone-2876.wav");
  
  //for loading sword sound
  swordSound = loadSound("mixkit-dagger-woosh-1487.wav");
  
  //for loading fruit_board
  fruit_boardimg = loadImage("fruit board.jpg");
}

function setup() {
  createCanvas(600,400);
  
  fruit_board=createSprite(300,200,300,200);
 fruit_board.addImage(fruit_boardimg);
 fruit_board.scale = 2.5;

  
  //for creating sword 
  sword=createSprite(50,200,20,20);
  sword.addImage(swordimg);
  sword.scale = 0.7;
  
  // for score
  score = 0;
  
  //for creating fruit and enemy group
  fruitsGroup = createGroup();
  enemyGroup = createGroup();
  
  
 
  
}

function draw(){
 background("white");
 
  if(gameState === PLAY) {
  //for calling fruit function
  fruit();
  
  //for calling enemy function
  enemy();
    
  //for the sword when touching fruitsgroup
  if(fruitsGroup.isTouching(sword)) {
    fruitsGroup.destroyEach();
    score = score+2;
    swordSound.play();
  }
    
  //for setting sword x and y according to mouse x,y
  sword.x = mouseX;
  sword.y = mouseY;
    
  
    
  if(enemyGroup.isTouching(sword)) {
    gameState = END;
    gameOverSound.play();
    
   
    
  }
   
  }
  
  if(gameState === END) {
 
    sword.addImage(gameOverImage);
    sword.x = 300;
    sword.y = 200;
  
    //for destroying monster
    enemyGroup.destroyEach();
   
    //for destroying fruits
    fruitsGroup.destroyEach();
    
    //for setting monster and fruits velocityX 0
    enemyGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
    
  }
  

  
 
  drawSprites();

  drawSprites();
  fill("white");
  stroke("black");
  strokeWeight(4);
  textSize(30);
  text(score,295,30);
}

function gameover(){
  gameState="PLAY";
  score=0;
}
  
function fruit() {
  if(World.frameCount%80===0){
    position=Math.round(random(1,2));
    fruits = createSprite(300,200,20,20);
    if(position==1){
      fruits.x=600;
      fruits.velocityX=-(7+(score/4));
    }
    else{
      if(position==2){
        fruits.x=0
        fruits.velocityX=(7+(score/4));
      }
    }
    fruits.scale = 0.2;
    r=Math.round(random(1,4));
    
  //for setting fruits image randomly
  if (r == 1) {
    fruits.addAnimation("fruit",fruit1);
  }
  if (r == 2) {
    fruits.addImage(fruit2);
  }
  if (r == 3) {
    fruits.addImage(fruit3);
  }
  if (r == 4) {
    fruits.addImage(fruit4);
  }
  //for setting fruits y randomly 
  fruits.y = Math.round(random(50,340));
 
  
  
 //for setting lifetime of fruits
  fruits.setLifetime = 100;
    
 //for adding fruit to fruitsgroups
  fruitsGroup.add(fruits);
  }
}


function enemy() {
  if (World.frameCount%200 === 0) {
    position = Math.round (random(1,2));
  monster = createSprite(600,200,20,20);
    
    if(position==1){
      monster.x=600;
      monster.velocityX=-(8+(score/4));
    }
    else {
      if(position==2){
        monster.x=0;
        monster.velocityX=(8+(score/4));
      }
    }
    
  monster.y = Math.round(random(100,300));
  
  monster.setLifetime = 50;
  
  //for generating random alien animation
  var rndm = Math.round(random(1,2));
  switch(rndm) {
    case 1:monster.addImage(monsterimg);
      break;
      case 2:monster.addImage(monsterimg2);
      break;
  }
  
  //for adding monster to enemygroups
  enemyGroup.add(monster);
  }
}


