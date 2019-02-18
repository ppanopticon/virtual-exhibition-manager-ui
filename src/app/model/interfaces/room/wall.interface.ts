import {Vector3f} from '../general/vector-3f.model';
import {Direction} from './direction.model';
import {IExhibit} from '../objects/exhibit.interface';

export interface IWall {
    color: Vector3f;
    texture: string;
    direction: Direction;
    exhibits: IExhibit[];
}
