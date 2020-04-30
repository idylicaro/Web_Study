function setup() {
  createCanvas(720, 400);
  background(59);
  userSnake = new snake();
  fill(255,255,255);
  square(userSnake.getPosition()[0], userSnake.getPosition()[1], userSnake.sizeUnit);
}

function draw() {
  keyPressed();
  userSnake.updatePosition();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      userSnake.setDirection('W');
      break;
    case DOWN_ARROW:
      userSnake.setDirection('S');
      break;
    case LEFT_ARROW:
      userSnake.setDirection('A');
      break;
    case RIGHT_ARROW:
      userSnake.setDirection('D');
      break;
  }
}
function snake() {
  let keyDirection;
  let position = [360, 200]; //x,y
  let sColor = 255; //white
  const sizeUnit = 10;
  const velocity = 10;

  //gets and sets
  this.getDirection = function () {
    return this.keyDirection;
  }
  this.setDirection = keyDirection => {
    this.keyDirection = keyDirection;
  }
  this.getPosition = function () {
    return this.position;
  }
  this.setPosition = vectorPosition => {
    this.position = vectorPosition;
  }
   this.updatePosition= function(){
    if (this.getDirection() === 'W') {
      this.setPosition( [this.position[0], this.position[1] - this.velocity] );
    }else if(this.getDirection() === 'S'){
      this.setPosition( [this.position[0], this.position[1] + this.velocity] ); 
    }else if(this.getDirection() === 'A'){
      this.setPosition( [this.position[0] - this.velocity, this.position[1]] );
    }else if(this.getDirection() === 'D'){
      this.setPosition( [this.position[0] + this.velocity, this.position[1]] );
    }
  }
}