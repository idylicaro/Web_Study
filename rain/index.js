
var drops = [];
var widthScreen = screen.width;
var heightScreen = screen.height;
function setup(){
    createCanvas(widthScreen-16,heightScreen-200);
    for (let i = 0; i < 500; i++) {
        drops[i] = new Drop();
    }
}

function draw(){
    background(49);
    for (let i = 0; i < 500; i++) {
        drops[i].fall();
        drops[i].show();
    }
    
}