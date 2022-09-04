import { Boid } from "./types/boids";
import { Position } from "./types/position";




window.onload = init;

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 600;


const canvas = createGameCanvas();
const context = canvas.getContext('2d')!;

const boids: Boid[] = initialiseBoids();


/**
 * Startup method.
 * @returns nothing
 */
function init(){

    // Add the canvas element to the document.
    document.body.appendChild(canvas);

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
function initialiseBoids() : Boid[] {

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

        boids.push(new Boid(context, randomPosition, RandNumberBetween(-179, 179), RandNumberBetween(1,1.5)));

    }
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
    canvas.height = MAX_HEIGHT;
    canvas.width = MAX_WIDTH;
    return canvas;

}





