import { Boid } from "./types/boids/boid";
import { Position } from "./types/position";
import { IBoid } from "./types/gameobjects"
import { PredatorBoid } from "./types/boids/predatorboid";



window.onload = init;

let canvasWidth = 1000;
let canvasHeight = 600;


const canvas = createGameCanvas();
const context = canvas.getContext('2d')!;

let boids: IBoid[] = initialiseBoids();


/**
 * Startup method.
 * @returns nothing
 */
function init(): void{

    // Add the canvas element to the document.
    //document.body.appendChild(canvas);

    document.getElementById("container")?.appendChild(canvas);


   
    /**
     * Do nothing if the context could not be initialised.
     */
    if(context == null){
        return;
    }

    /**
     * Start the game loop.
     */
    window.requestAnimationFrame(gameLoop);
}






/**
 * Creates a list of boids of a random length.
 * @returns A List of boids.
 */
function initialiseBoids() : IBoid[] {

    // The max and minimum range of boids to be created.
    let max = 50;
    let min = 10;

    let boids : Boid[] = [];

    // The number of boids to be generated.
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);

    for(let i = 0; i < randomNum; i++){

        // The random starting position for the boid.
        let randomPosition : Position;
        randomPosition = new Position(RandNumberBetween(100,900), RandNumberBetween(100,500));

        boids.push(new Boid(context, randomPosition, RandNumberBetween(-179, 179), RandNumberBetween(1.2,1.5)));
    }

    // The random starting position for the boid.
    let randomPosition : Position;
    randomPosition = new Position(RandNumberBetween(100,900), RandNumberBetween(100,500));
    boids.push(new PredatorBoid(context, randomPosition, RandNumberBetween(-179, 179), 0.5));

    randomPosition = new Position(RandNumberBetween(100,900), RandNumberBetween(100,500));
    boids.push(new PredatorBoid(context, randomPosition, RandNumberBetween(-179, 179), 1));


    return boids;
}

/**
 * Creates a random number between given min and max parameters.
 * @param min - The minimum value that can be generated.
 * @param max - The maximum value that can be generated.
 * @returns 
 */
function RandNumberBetween(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * The game loop.
 * @param timeStamp 
 */
function gameLoop(timeStamp : number){
    renderFrame();

    // Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

/**
 * Executes on every frame render. 
 */
function renderFrame(){

    // Clear the screen.
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the boids.
    boids.forEach(boid => {

        boid.turn(RandNumberBetween(-1, 1));

        if(boid instanceof PredatorBoid){

        }

        boid.draw();
        boid.wrapPosition(canvas.width, canvas.height);
    });

    
}


/**
 * Creates a canvas element.
 * @returns - instance of a HTMLCanvasElement.
 */
function createGameCanvas() : HTMLCanvasElement {
    let canvas = document.createElement("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    return canvas;

}





