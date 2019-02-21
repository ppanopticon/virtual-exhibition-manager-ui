import {IWall} from '../interfaces/room/wall.interface';
import {Vector3f} from '../interfaces/general/vector-3f.model';
import {Direction} from '../interfaces/room/direction.model';
import {Exhibit} from './exhibit.model';
import {Room} from './room.model';

export class Wall implements IWall {
    /** List of @type {Exhibit}s placed on this @type {Wall}. */
    public readonly exhibits: Exhibit[] = [];

    /** Reference to the {Room} this {Wall} belongs to. */
    public _belongsTo: (Room | null);

    /**
     * Default constructor for @type {Wall}.
     * @param direction
     * @param color
     * @param texture
     */
    constructor(public direction: Direction, public color: Vector3f, public texture: string) {}

    /**
     * Copies a @type {IWall} to a new @type {Wall} object.
     *
     * @param w IWall object
     */
    public static copy(w: IWall): Wall{
        const n = new Wall(w.direction, w.color, w.texture);
        for (const e of w.exhibits) {
            const ec = Exhibit.copy(e);
            ec._belongsTo = n;
            n.exhibits.push(ec);
        }
        return n;
    }

    /**
     * Returns this {Wall}'s designation.
     */
    get designation() {
        if (this._belongsTo) {
            return `${this._belongsTo.text} (${this.direction})`;
        } else {
           return  this.direction;
        }
    }
}
