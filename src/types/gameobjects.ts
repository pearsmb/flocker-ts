import type { Position } from './position';

export interface IDrawable{
    Context: CanvasRenderingContext2D;
    Position: Position
    wrapPosition(xLimit: number, yLimit: number) : void;
    draw(): void
    move(distance: number): void
}

export interface IBoid extends IDrawable{

    Speed: number;
    Size: number;
    Angle: number;
    turn(angle: number) : void;
}

