import {IExhibition} from '../interfaces/exhibition/exhibition.interface';
import {Room} from './room.model';

/**
 *
 */
export class Exhibition implements IExhibition {

    /** List of @type {Rooms} for this @type {Exhibition}. */
    public readonly rooms: Room[] = [];

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
     * Copies a @type {IExhibition} to a new @type {Exhibition} object.
     *
     * @param e IExhibition object
     */
    public static copy(e: IExhibition): Exhibition {
        const n =  new Exhibition(e.id, e.name, e.description);
        for (const r of e.rooms) {
            n.rooms.push(Room.copy(r));
        }
        return n;
    }
}