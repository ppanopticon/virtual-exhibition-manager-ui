import {Vector3f} from '../general/vector-3f.model';
import {ICHO} from './cho.interface';

export interface IExhibit extends ICHO {
    position: Vector3f;
    size: Vector3f;
    audio: string;
    light: boolean;
}