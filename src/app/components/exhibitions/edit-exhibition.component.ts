import {Component} from '@angular/core';
import {EditorService} from '../../services/editor/editor.service';
import {Exhibition} from '../../model/implementations/exhibition.model';
import {Room} from '../../model/implementations/room.model';
import {Wall} from '../../model/implementations/wall.model';
import {Exhibit} from '../../model/implementations/exhibit.model';
import {IRoom} from '../../model/interfaces/room/room.interface';

@Component({
    selector: 'app-edit-exhibitions',
    templateUrl: 'edit-exhibition.component.html',
    styleUrls: ['edit-exhibition.component.scss']
})
export class EditExhibitionComponent {
    /**
     * Default constructor.
     *
     * @param _editor Reference to the @type EditorService
     */
    constructor(private _editor: EditorService) {}

    /**
     * Getter for the @type {Exhibition}.
     */
    get exhibition(): Exhibition {
        return this._editor.current;
    }

    /**
     * Getter for the inspected element.
     */
    get inspected(): (Exhibition | Room | Wall | Exhibit) {
        return this._editor.inspected;
    }

    /**
     * Setter for the inspected element.
     *
     * @param element New inspected element.
     */
    set inspected(element: (Exhibition | Room | Wall | Exhibit)) {
        this._editor.inspected = element;
    }

    /**
     * Returns the name of type of the currently inspected element.
     *
     * @return Type of the inspected element.
     */
    get selectedType(): string {
        if (this.inspected instanceof Exhibit) {
            return 'Exhibit';
        } else if (this.inspected instanceof Exhibition) {
            return 'Exhibition';
        } else if (this.inspected instanceof Room) {
            return 'Room';
        } else if (this.inspected instanceof Wall) {
            return 'Wall';
        } else {
            return 'Nothing';
        }
    }

    /**
     *
     */
    get isSelectedExhibition() {
        return this.inspected instanceof Exhibition;
    }

    /**
     *
     */
    get isSelectedRoom() {
        return this.inspected instanceof Room;
    }

    /**
     *
     */
    get isSelectedWall() {
        return this.inspected instanceof Wall;
    }

    /**
     *
     */
    get isSelectedExhibit() {
        return this.inspected instanceof Exhibit;
    }

    /**
     * Called whenever a user clicks a {Exhibition}.
     * @param event The mouse event.
     * @param exhibition The {Exhibition} that has been clicked.
     */
    public exhibitionClicked(event: MouseEvent, exhibition: Exhibition) {
        this._editor.inspected = exhibition;
        event.stopPropagation();
    }

    /**
     * Called whenever a user clicks a {Room}.
     * @param event The mouse event.
     * @param room The {Room} that has been clicked.
     */
    public roomClicked(event: MouseEvent, room: Room) {
        this._editor.inspected = room;
        event.stopPropagation();
    }

    /**
     * Called whenever a user clicks a {Wall}.
     * @param event The mouse event.
     * @param wall The {Wall} that has been clicked.
     */
    public wallClicked(event: MouseEvent, wall: Wall) {
        this._editor.inspected = wall;
        event.stopPropagation();
    }
}
