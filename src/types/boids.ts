
import type { IBoid } from "./gameobjects"
import { Position } from "./position";

export class Boid implements IBoid{

    private Position: Position;
    private Angle: number = 0;
    private Context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, position: Position) {
        
        this.Position = position;
        this.Context = context;
    }

    public wrapPosition(xLimit: number, yLimit: number){

        if(this.Position.X > xLimit) this.Position.X = 0;

        else if(this.Position.X < 0) this.Position.X = xLimit;

        else if(this.Position.Y > yLimit) this.Position.Y = 0;

        else if(this.Position.Y < 0) this.Position.Y = yLimit;

    }

    public draw() : void {

        // let img = new Image();
        // img.src = "sprites/boid.jpg";
        
        // var ctx = this.Context;

        // img.onload = function (){
        //     ctx.drawImage(img,40,40, 40,40);
        // }
        

        // pixel size of the boids.
        let length = 20;

        this.move(1)

        
        

        this.Context.beginPath();

        this.Context.arc(this.Position.X, this.Position.Y, 18, 0, 2 * Math.PI);        
        this.Context.stroke();



        this.Context.beginPath();

        this.Context.moveTo(this.Position.X, this.Position.Y);

        this.turn(90);
		this.move(10);
		this.turn(-120);
		this.move(20);
		this.turn(-120);
		this.move(20);
		this.turn(-120);
		this.move(10);
        this.turn(-90);
        this.Context.stroke();


    }


    move(distance: number) : void {

        let x = distance * Math.sin(this.Angle * Math.PI/180) + this.Position.X; 
        let y = distance * Math.cos(this.Angle * Math.PI/180) + this.Position.Y; 

        this.Position.X = x;
        this.Position.Y = y;

        this.Context.lineTo(x, y);

    }

    sortAngle(angle: number){
        while(angle > 180){
			angle = angle - 360;
		}
		// and vice versa
		while(angle < -179){
			angle = angle + 360;
		}
		return angle;
    }

    turn(angle: number){
        //this.Angle = this.sortAngle(this.Angle + angle);

        this.Angle += angle;

        this.Angle = this.sortAngle(this.Angle);

    }
    
}