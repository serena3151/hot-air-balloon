var balloon,balloonImage1,balloonImage2;
var database;
var pos;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();   
   var databaseRef = database.ref("balloon/position")
  databaseRef.on("value",readPosition)
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,-10)
    balloon.scale = balloon.scale + 0.01
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,10)
    balloon.scale = balloon.scale - 0.01
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data){
  pos = data.val();
  balloon.x=pos.x
  balloon.y=pos.y
  }
  
  function updatePosition(x,y){
   database.ref("balloon/position").update({
       x:balloon.x+x,
       y:balloon.y+y
   })
  }

  function showError(){
    console.log("error is found in database")
  }