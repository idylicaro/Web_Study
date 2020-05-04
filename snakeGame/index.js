var sizeGlobal = 20; //size to px
var colsAndRows;

function setup() {
  frameRate(10);
  createCanvas(600, 600);
  colsAndRows = pickLocation();
  userSnake   = new snake();
  var food    = pickLocation();
}

function draw() {
  background(51);
  userSnake.death();
  userSnake.update();
  userSnake.show();
  fill(255,0,100);
  square(food.x,food.y,sizeGlobal);
  
  if(userSnake.eat(food)){
      userSnake.bodySize++;
      pickLocation();
  }
  
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      userSnake.setSpeed(0,-1);
      break;
    case DOWN_ARROW:
      userSnake.setSpeed(0,1);
      break;
    case LEFT_ARROW:
      userSnake.setSpeed(-1,0);
      break;
    case RIGHT_ARROW:
      userSnake.setSpeed(1,0);
      break;
  }
}
function pickLocation(){
  var cols = Math.floor(width/sizeGlobal);
  var rows = Math.floor(height/sizeGlobal);
  food = new p5.Vector(Math.floor(random(cols)), Math.floor(random(rows))); //p5.js reference
  food.mult(sizeGlobal);
}

function snake() {
  this.position = [0, 0]; //x,y
  this.sColor = 255; //white
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.bodySize = 0;
  this.body = [];

  //gets and sets
  this.getPosition = function () {
    return this.position;
  }
  this.setPosition = vectorPosition => {
    this.position = vectorPosition;
  }
  this.setSpeed = function(x,y){
    this.xSpeed =x;
    this.ySpeed =y;
  }

  this.show = function(){
    fill(255);
    for (let i = 0; i < this.body.length; i++) {
      square(this.body[i].x,this.body[i].y,sizeGlobal);
    }
    fill(255);
    square(this.position[0],this.position[1],sizeGlobal);
    }

    this.eat = function(pos){
      let distance = dist(this.position[0], this.position[1], pos.x, pos.y);
      return (distance < 1) ? true:false;
    }
    this.death = function(){
      for (let i = 0; i < this.body.length; i++) {
        let pos = this.body[i];
        let distance = dist(this.position[0], this.position[1], pos.x, pos.y);
        if(distance < 1){
          this.bodySize = 0;
          this.body = [];
        }
      }
    }
    this.update = function(){
      if(this.bodySize === this.body.length){
        for (let i = 0; i < this.body.length-1; i++) {
          this.body[i] = this.body[i+1];
        }
      }
      this.body[this.bodySize-1] = new p5.Vector(this.position[0], this.position[1]);

      this.position[0] = this.position[0] + this.xSpeed * sizeGlobal;
      this.position[1] = this.position[1] + this.ySpeed * sizeGlobal;

      this.position[0] = constrain(this.position[0], 0,width - sizeGlobal);
      this.position[1] = constrain(this.position[1], 0,height - sizeGlobal); 

    }
  }
  

