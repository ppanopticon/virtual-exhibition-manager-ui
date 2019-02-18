import {IExhibit} from '../interfaces/objects/exhibit.interface';
import {CHOType} from '../interfaces/objects/cho-type.interface';
import {Vector3f} from '../interfaces/general/vector-3f.model';

export class Exhibit implements IExhibit {


    /**
     *
     * @param id
     * @param name
     * @param type
     * @param description
     * @param path
     * @param light
     * @param audio
     * @param position
     * @param size
     */
    constructor(public id: string, public name: string, public type: CHOType, public description: string,
                public path: string, public light: boolean, public audio: string, public position: Vector3f, public size: Vector3f) {}


    /**
     * Copies a @type {IExhibit} to a new @type {Exhibit} object.
     *
     * @param e IExhibit object
     */
    public static copy(e: IExhibit): Exhibit {
        return new Exhibit(e.id, e.name, e.type, e.description, e.path, e.light, e.audio, e.position, e.size);
    }
}