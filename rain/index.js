var drops = [];

function setup(){
    createCanvas(1350,460);
    for (let i = 0; i < 500; i++) {
        drops[i] = new Drop();
    }
}
function draw(){
    background(59);
    for (let i = 0; i < 500; i++) {
        drops[i].fall();
        drops[i].show();
    }
    
}