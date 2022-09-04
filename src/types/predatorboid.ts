import { Boid } from "./boid";
import { Position } from "./position";


export class PredatorBoid extends Boid{

    Size: number = 50;

    /**
     * Creates an instance of a boid.
     * @param context The canvas context to draw to.
     * @param position - The Position as a cartesian coordinate.
     * @param angle - The starting angle of the boid.
     * @param speed - The movement speed of the boid.
     */
    constructor(context: CanvasRenderingContext2D, position: Position, angle: number, speed: number) {
        super(context, position, angle, speed);
    }

    



}