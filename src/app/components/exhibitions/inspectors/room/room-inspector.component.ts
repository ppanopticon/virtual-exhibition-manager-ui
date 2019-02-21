import {Component, Input} from '@angular/core';
import {Room} from '../../../../model/implementations/room.model';
import {Textures} from '../../../../model/interfaces/general/textures.model';

@Component({
    selector: 'app-room-inspector',
    templateUrl: 'room-inspector.component.html',
    styleUrls: ['room-inspector.component.scss']
})
export class RoomInspectorComponent {
    @Input('room')
    private _room: Room = null;

    /** List of available textures. */
    private _textures: string[] = Textures.map(v => v.toString());

    /**
     * Default constructor.
     */
    constructor() {}

    /**
     *
     */
    get textures() {
        return this._textures;
    }


    /**
     * Getter for the
     */
    get room(): Room {
        return this._room;
    }
}
