import {IExhibition} from '../interfaces/exhibition/exhibition.interface';
import {Room} from './room.model';

/**
 *
 */
export class Exhibition implements IExhibition {

    /** List of @type {Rooms} for this @type {Exhibition}. */
    public rooms: Room[] = [];

    /**
     * Copies a @type {IExhibition} to a new @type {Exhibition} object.
     *
     * @param e IExhibition object
     * @param target The target for the Proxy object.
     */
    public static copyAsProxy(e: IExhibition, target: object): Exhibition {
        const n = new Proxy(new Exhibition(e.id, e.name, e.description), target);
        n.rooms = new Proxy([], target);
        for (const r of e.rooms) {
            const rc = Room.copyAsProxy(r, target);
            rc._belongsTo = n;
            n.rooms.push(rc);
        }
        return n;
    }

    /**
     *
     * @param id
     * @param name
     * @param description
     */
    constructor(public id: string, public name: string, public description: string) {}

    /**
     * Returns a short ID for this @type {Exhibition}
     */
    get shortId(): string {
        return this.id.substr(0,5);
    }

    /**
     * Adds a copyAsProxy of the provided {Room} to this {Exhibition}
     *
     * @param r The {Room} to delete OR the index of the {Room} to delete.
     * @return true on success, false otherwise.
     */
    public addRoom(r: Room) {
        this.rooms.push(r);
        r._belongsTo = this;
    }

    /**
     * Delete the provided {Room} from this {Exhibition}
     *
     * @param r The {Room} to delete OR the index of the {Room} to delete.
     * @return true on success, false otherwise.
     */
    public deleteRoom(r: (Room | number)) {
        if (r instanceof Room) {
            r = this.rooms.indexOf(r);
        }
        if (r > -1 && r < this.rooms.length) {
            this.rooms.splice(r, 1);
            return true;
        } else {
            return false;
        }
    }
}
