import { Boid } from "./types/boids";
import { Position } from "./types/position";


window.onload = init;


const canvas = createGameCanvas();
const context = canvas.getContext('2d')!;



let boid : Boid = new Boid(context, new Position(200,150),100);


function init(){

    document.body.appendChild(canvas);
    
    if(context == null){
        return;
    }



    window.requestAnimationFrame(gameLoop);
}


function gameLoop(timeStamp : number){
    renderFrame();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}



function renderFrame(){

    context.clearRect(0, 0, canvas.width, canvas.height);


    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';

    boid.draw();


    boid.wrapPosition(canvas.width, canvas.height);
    
    
}





function createGameCanvas() : HTMLCanvasElement {

    let canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 300;

    return canvas;

}

