import { Boid } from "./types/boids";
import { Position } from "./types/position";


window.onload = init;


const canvas = createGameCanvas();
const context = canvas.getContext('2d')!;

const boids: Boid[] = initialiseBoids();


function init(){

    document.body.appendChild(canvas);

    
    if(context == null){
        return;
    }

 
    window.requestAnimationFrame(gameLoop);
}


function initialiseBoids() : Boid[] {

    let max = 50;
    let min = 10;

    let boids : Boid[] = [];

    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

    for(let i = 0; i < randomNum; i++){

        let randomPosition : Position;
        randomPosition = new Position(RandNumberBetween(100,900), RandNumberBetween(100,500));

        boids.push(new Boid(context, randomPosition, RandNumberBetween(-179, 179), RandNumberBetween(1,1.5)));

    }


    return boids;

}

function RandNumberBetween(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameLoop(timeStamp : number){
    renderFrame();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}



function renderFrame(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    

    boids.forEach(boid => {

        boid.turn(RandNumberBetween(-1, 1));
        boid.draw();
        boid.wrapPosition(canvas.width, canvas.height);

    });


    
    
}





function createGameCanvas() : HTMLCanvasElement {

    let canvas = document.createElement("canvas");
    
    canvas.width = 1000;
    canvas.height = 600;

    return canvas;

}





