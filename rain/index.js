
var drops = [];
var widthScreen = screen.width;
var heightScreen = screen.height;
var canvas;
function setup(){
    canvas = createCanvas(widthScreen,heightScreen);
    canvas.position(0,0);
    canvas.style('z-index','-1')
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