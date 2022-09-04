
import type { IBoid } from "./gameobjects"
import { Position } from "./position";

export class Boid implements IBoid{

    private Position: Position;
    private Angle: number;
    private Context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, position: Position, angle: number) {
        
        this.Position = position;
        this.Angle = angle;
        this.Context = context;
    }

    public wrapPosition(xLimit: number, yLimit: number){

        if(this.Position.X > xLimit) this.Position.X = 0;

        else if(this.Position.X < 0) this.Position.X = xLimit;

        else if(this.Position.Y > yLimit) this.Position.Y = 0;

        else if(this.Position.Y < 0) this.Position.Y = yLimit;

    }

    public draw() : void {

        // pixel size of the boids.
        let length = 20;
        let angle = 20;

        this.Position.X += 1;
        this.Position.Y += 1;


        this.Context.beginPath();
        
        this.Context.moveTo(this.Position.X, this.Position.Y);

        this.Context.lineTo(this.Position.X + length, this.Position.Y);
        this.Context.lineTo(this.Position.X + length/2, this.Position.Y - length*2);
        this.Context.lineTo(this.Position.X, this.Position.Y);


        this.Context.stroke();

    }


    move(increment: number) : void {

        

    }

    



}