
import type { IBoid } from "./gameobjects"
import { Position } from "./position";

export class Boid implements IBoid{

    Position: Position;
    Angle: number;
    Context: CanvasRenderingContext2D;
    Size: number = 20;
    Speed: number;


    /**
     * Creates an instance of a boid.
     * @param context The canvas context to draw to.
     * @param position - The Position as a cartesian coordinate.
     * @param angle - The starting angle of the boid.
     * @param speed - The movement speed of the boid.
     */
    constructor(context: CanvasRenderingContext2D, position: Position, angle: number, speed: number) {
        this.Position = position;
        this.Context = context;
        this.Angle = angle;
        this.Speed = speed;
    }

    public wrapPosition(xLimit: number, yLimit: number){

        if(this.Position.X > xLimit) this.Position.X = 0;

        else if(this.Position.X < 0) this.Position.X = xLimit;

        else if(this.Position.Y > yLimit) this.Position.Y = 0;

        else if(this.Position.Y < 0) this.Position.Y = yLimit;

    }

    public draw(){

        this.move(this.Speed);

        this.Context.beginPath();
        this.Context.moveTo(this.Position.X, this.Position.Y);
        this.turn(90);
		this.move(this.Size/2);
		this.turn(-120);
		this.move(this.Size);
		this.turn(-120);
		this.move(this.Size);
		this.turn(-120);
		this.move(this.Size/2);
        this.turn(-90);
        this.Context.stroke();
        this.Context.fill();
    }

    public move(distance: number) : void {

        let x = distance * Math.sin(this.Angle * Math.PI/180) + this.Position.X; 
        let y = distance * Math.cos(this.Angle * Math.PI/180) + this.Position.Y; 

        this.Position.X = x;
        this.Position.Y = y;
        this.Context.lineWidth = 4;
        this.Context.strokeStyle = "gray"
        this.Context.lineTo(x, y);

    }

    private sortAngle(angle: number){
        while(angle > 180){
			angle = angle - 360;
		}
		// and vice versa
		while(angle < -179){
			angle = angle + 360;
		}
		return angle;
    }

    public turn(angle: number){
        //this.Angle = this.sortAngle(this.Angle + angle);

        this.Angle += angle;

        this.Angle = this.sortAngle(this.Angle);

    }
    
}