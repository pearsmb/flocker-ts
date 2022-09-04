
import type { IBoid } from "./gameobjects"
import type { Position } from "./position";

export class Boid implements IBoid{

    Position: Position;
    Angle: number;
    
    constructor(position: Position, angle: number) {
        
        this.Position = position;
        this.Angle = angle;
    }

    public draw() : void {

    }

}