import {IExhibit} from '../interfaces/objects/exhibit.interface';
import {CHOType} from '../interfaces/objects/cho-type.interface';
import {Vector3f} from '../interfaces/general/vector-3f.model';
import {Room} from './room.model';
import {Wall} from './wall.model';
import {IRoom} from '../interfaces/room/room.interface';
import {IExhibition} from '../interfaces/exhibition/exhibition.interface';

export class Exhibit implements IExhibit {

    /** Reference to the {Room} or {Wall} this {Exhibit} belongs to. */
    public _belongsTo: (Room | Wall | null);

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
     * @param target The target for the Proxy object.
     */
    public static copyAsProxy(e: IExhibit, target: object): Exhibit {
        return new Proxy(
            new Exhibit(e.id, e.name, e.type, e.description, e.path, e.light, e.audio, e.position, e.size),
            target
        );
    }

    /**
     * Returns a description of this {Exhibit}'s location.
     */
    get location() {
        if (this.isOnWall) {
            return `Wall (${(<Room>(<Wall>this._belongsTo)._belongsTo).text}, ${ (<Wall>this._belongsTo).direction})`;
        } else if (this.isInRoom) {
            return `Room (${(<Room>this._belongsTo).text})`;
        } else {
            return 'No location';
        }
    }

    /**
     * Returns true, if this {Exhibit} hangs on a wall {Room}.
     */
    get isOnWall(): boolean {
        return this._belongsTo instanceof Wall;
    }

    /**
     * Returns true, if this {Exhibit} is placed in a {Room}.
     */
    get isInRoom(): boolean {
        return this._belongsTo instanceof Wall;
    }
}
