import {Texture} from './texture.model';
import {Vector3f} from './vector-3f.model';

export interface Room {
    text: String;
    ambient: String;
    floor: Texture;
    ceiling: Texture;
    size: Vector3f;
    entrypoint: Vector3f;
}