var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
 // spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  
  
 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);
}

function draw(){
  background(0);
 
  if(gameState==="play"){
  
 if(tower.y>400){
   tower.y=300;
 }
    
  if(keyDown("Left_Arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("Right_Arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("Space")){
    ghost.velocityY=-3;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy()
    gameState="end";
  }
  
  spawnDoors()
  
    drawSprites();
  }
  
  if(gameState==="end"){
    textSize(20);
    text("GAMEOVER",250,250);
    
    
    
  }
}

function spawnDoors(){
  if(frameCount%300===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY=3;
    door.x=Math.round(random(100,400))
    door.lifetime=700;
    doorsGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=3;
    climber.x=door.x;
    climber.lifetime=700;
    climbersGroup.add(climber);
    
  invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=3;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime=700;
  }
}