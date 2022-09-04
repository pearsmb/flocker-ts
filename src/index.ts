import { Boid } from "./types/boids";
import { Position } from "./types/position";


window.onload = init;


const canvas = createGameCanvas();
const context = canvas.getContext('2d')!;

const increaseAngleBtn = CreateAngleButton();




let boid : Boid = new Boid(context, new Position(200,150));


function init(){

    document.body.appendChild(canvas);
    document.body.appendChild(increaseAngleBtn);

    
    if(context == null){
        return;
    }
    
    boid.draw();

    window.requestAnimationFrame(gameLoop);
}


function gameLoop(timeStamp : number){
    renderFrame();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}



function renderFrame(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    

    boid.draw();

    


    boid.wrapPosition(canvas.width, canvas.height);
    
    
}





function createGameCanvas() : HTMLCanvasElement {

    let canvas = document.createElement("canvas");

    canvas.width = 400;
    canvas.height = 300;

    return canvas;

}


function CreateAngleButton(){

    let btn = document.createElement("button");    
    btn.innerHTML = "Click Me";    
    btn.onclick = function (){
        boid.turn(5);

    };

    return btn;

}


