import type { Position } from './position';

export interface IDrawable{
    Position: Position
    draw(): void
    move(distance: number): void
}

export interface IBoid extends IDrawable{

    Speed: number;
    Size: number;
    Angle: number;
    Context: CanvasRenderingContext2D;

    wrapPosition(xLimit: number, yLimit: number) : void;
    turn(angle: number) : void;
    
}