import { IBoid } from "../gameobjects";
import { Position } from "../position";
import { Boid } from "./boid";


export class FlockingBoid extends Boid {

    
    Cohesion: number = 0;
    Alignment: number = 0;
    Separation: number = 0;
    Range: number = 20;

    /**
     *
     */
    constructor(context: CanvasRenderingContext2D, position: Position, angle: number, speed: number) {
        super(context, position, angle, speed);
    }

    calculateCohesionAngle(averagePosition: Position, averageAngle: number){

        let x = averagePosition.X - this.Position.X;
        let y = averagePosition.Y - this.Position.Y;

        let angle = 90 - ( this.Angle + (Math.atan2(y,x) * (180 / Math.PI)));

        return angle;
    }

    calculateAlignmentAngle(averageAngle: number){

        return averageAngle - this.Angle;
        
    }

    calculateSeparationAngle(averagePosition: Position, averageAngle: number){

        let x = averagePosition.X - this.Position.X;
        let y = averagePosition.Y - this.Position.Y;

        let angle = 90 - ( this.Angle + (Math.atan2(y,x) * (180 / Math.PI)));

        return -angle;

    }

    public setFlockingAttributes(boids: IBoid[]){
        
        let boidsWithinRange : IBoid[] = [];

        let x : number;
        let y : number;

        boids.forEach(boid => {


            if(boid != this){

                x = boid.Position.X;
                y = boid.Position.Y;

                if(Math.sqrt(Math.pow(x - this.Position.X, 2) + Math.pow(y - this.Position.Y, 2)) < this.Range)
                {
                    boidsWithinRange.push(boid);
                }
            }
        });

        // do nothing if nothing to flock
        if(boidsWithinRange.length == 0){
            return;
        }


        let averageAngle = this.calculateAverageAngle(boidsWithinRange)!;
        let averagePosition = this.calculateAveragePosition(boidsWithinRange)!;

        let cohesion = this.calculateCohesionAngle(averagePosition, averageAngle);
        let separation = this.calculateSeparationAngle(averagePosition, averageAngle);
        let alignment = this.calculateAlignmentAngle(averageAngle);

        this.turn(separation / 100);
        this.turn(cohesion/ 100);
        this.turn(alignment / 100);


    }


    calculateAverageAngle(boids : IBoid[]) : number | null {

        let averageAngle = 0;

        boids.forEach(boid => {
            averageAngle += boid.Angle;
        });

        return averageAngle / boids.length;
    }


    calculateAveragePosition(boids: IBoid[]) : Position | null {

        let averageX = 0;
        let averageY = 0;

        boids.forEach(boid => {
            averageX += boid.Position.X;
            averageY += boid.Position.Y;
        });

        return new Position(averageX/boids.length, averageY/boids.length);
    }

}