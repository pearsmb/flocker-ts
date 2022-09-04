import { IBoid } from "../gameobjects";
import { Position } from "../position";
import { Boid } from "./boid";


export class FlockingBoid extends Boid {

    
    Cohesion: number = 0;
    Alignment: number = 0;
    Separation: number = 0;
    Range: number = 0;

    /**
     *
     */
    constructor(context: CanvasRenderingContext2D, position: Position, angle: number, speed: number) {
        super(context, position, angle, speed);
    }

    calculateCohesionAngle(averagePosition: Position, averageAngle: number){

        let x = averagePosition.X - this.Position.X;
        let y = averagePosition.Y - this.Position.Y;

        let angle = 90 - ( (this.Angle * 180 * Math.PI) + (Math.atan2(y,x) * 180 * Math.PI));

        return -this.sortAngle(angle);

    }

    calculateAlignmentAngle(averagePosition: Position, averageAngle: number){

    }

    calculateSeparationAngle(averagePosition: Position, averageAngle: number){

    }

    public setFlockingAttributes(boids: IBoid[]){
        
        let boidsWithinRange : IBoid[] = [];

        console.log(boids.length);

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

        let averageAngle = this.calculateAverageAngle(boidsWithinRange);
        let averagePosition = this.calculateAveragePosition(boidsWithinRange);

        this.calculateSeparationAngle(averagePosition, averageAngle);
        this.calculateAlignmentAngle(averagePosition, averageAngle);
        let cohesion = this.calculateCohesionAngle(averagePosition, averageAngle);
        //console.log(cohesion);
        this.turn(cohesion * 10);


    }


    calculateAverageAngle(boids : IBoid[]) : number {

        let averageAngle = 0;

        boids.forEach(boid => {
            averageAngle += boid.Angle;
        });

        return averageAngle / boids.length;
    }


    calculateAveragePosition(boids: IBoid[]) : Position {

        let averageX = 0;
        let averageY = 0;

        boids.forEach(boid => {
            averageX += boid.Position.X;
            averageY += boid.Position.Y;
        });

        return new Position(averageX/boids.length, averageY/boids.length);
    }

}