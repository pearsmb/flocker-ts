import type { Position } from './position';

export interface IDrawable{
    Position: Position
    draw(): void
}

export interface IBoid extends IDrawable{

}