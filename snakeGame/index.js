function setup() {
  createCanvas(720, 400);
  
  userSnake = new snake();
}

function draw() {
  background(51);
  //keyPressed();
  userSnake.updatePosition();
  userSnake.show();
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
  this.keyDirection;
  this.position = [360, 200]; //x,y
  this.sColor = 255; //white
  this.sizeUnit = 10;
  this.velocity = 0.4;
  this.food = 1;
  this.body = [this.position];

  this.show = function(){
    this.body.forEach((element) => {
      fill(255);
      square(element[0],element[1],this.sizeUnit);
      console.log(element);
    });
      
  }
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
  this.updatePosition = function () {
    if (this.getDirection() === 'W') {
      this.setPosition([this.position[0], this.position[1] - (this.velocity*this.sizeUnit)]);
    } else if (this.getDirection() === 'S') {
      this.setPosition([this.position[0], this.position[1] + (this.velocity*this.sizeUnit)]);
    } else if (this.getDirection() === 'A') {
      this.setPosition([this.position[0] - (this.velocity*this.sizeUnit), this.position[1]]);
    } else if (this.getDirection() === 'D') {
      this.setPosition([this.position[0] + (this.velocity*this.sizeUnit), this.position[1]]);
    }
    this.body.unshift(this.position);
    this.body.pop();
  }
}