

window.onload = init;

const canvas = createGameCanvas();
const context = canvas.getContext('2d');


function init(){

    document.body.appendChild(canvas);
    
    window.requestAnimationFrame(gameLoop);
}


function gameLoop(timeStamp : number){
    draw();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function draw(){
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    if(context == null){
        return;
    }

    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);
}





function createGameCanvas() : HTMLCanvasElement {

    let canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 300;

    return canvas;

}

