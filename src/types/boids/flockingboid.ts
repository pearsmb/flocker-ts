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

    }

    calculateAlignmentAngle(averagePosition: Position, averageAngle: number){

    }

    calculateSeparationAngle(averagePosition: Position, averageAngle: number){

    }

    setFlockingAttributes(boids: IBoid[]){

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

        let averageAngle = this.calculateAverageAngle(boidsWithinRange);
        let averagePosition = this.calculateAveragePosition(boidsWithinRange);

        this.calculateSeparationAngle(averagePosition, averageAngle);
        this.calculateAlignmentAngle(averagePosition, averageAngle);
        this.calculateCohesionAngle(averagePosition, averageAngle);

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