import {IRoom} from '../interfaces/room/room.interface';
import {Vector3f} from '../interfaces/general/vector-3f.model';
import {Wall} from './wall.model';
import {Exhibit} from './exhibit.model';

export class Room implements IRoom {

    /** List of @type {Exhibit}s placed directly in this @type {Room}. */
    public readonly exhibits: Exhibit[] = [];

    /** List of @type {Wall}s that make up this @type {Room}. */
    public readonly walls: Wall[] = [];

    /**
     * Default constructor for @type {Room}.
     *
     * @param text
     * @param ambient
     * @param ceiling
     * @param floor
     * @param entrypoint
     * @param size
     */
    constructor(public text: string, public ambient: string, public ceiling: string, public floor: string, public position: Vector3f, public entrypoint: Vector3f, public size: Vector3f) {}

    /**
     * Copies a @type {IRoom} to a new @type {Room} object.
     *
     * @param r IRoom object
     */
    public static copy(r: IRoom): Room {
        const n = new Room(r.text, r.ambient, r.ceiling, r.floor, r.position, r.entrypoint, r.size);
        for (const e of r.exhibits) {
            n.exhibits.push(Exhibit.copy(e));
        }
        for (const w of r.walls) {
            n.walls.push(Wall.copy(w));
        }
        return n;
    }
}
