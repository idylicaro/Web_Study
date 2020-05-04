function Drop(){
    this.x = random(width);
    this.y = random (-500,-50);
    this.z = random(0,20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.ySpeed = map(this.z, 0, 20, 1, 20);

    this.fall = function(){
        this.y = this.y + this.ySpeed;
        let gravity = map(this.z, 0, 20, 0, 0.2);
        this.ySpeed = this.ySpeed + gravity;

        if(this.y > height){
            this.y = random (-200,-100);
            this.ySpeed = map(this.z, 0, 20, 4, 10);
        }
    }
    this.show = function(){
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(245);
        line(this.x, this.y, this.x, this.y+ this.len);
    }
}