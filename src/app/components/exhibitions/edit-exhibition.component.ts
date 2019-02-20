import {Component} from '@angular/core';
import {EditorService} from '../../services/editor/editor.service';
import {Exhibition} from '../../model/implementations/exhibition.model';
import {Room} from '../../model/implementations/room.model';
import {Wall} from '../../model/implementations/wall.model';
import {Exhibit} from '../../model/implementations/exhibit.model';

@Component({
    selector: 'app-edit-exhibitions',
    templateUrl: 'edit-exhibition.component.html',
    styleUrls: ['edit-exhibition.component.scss']
})
export class EditExhibitionComponent {
    /** Reference to the currently selected element. May be the Exhibition, a Room, Wall or individual Exhibit. */
    private _selected: (Exhibition | Room | Wall | Exhibit);

    /**
     * Default constructor.
     *
     * @param _editor Reference to the @type EditorService
     */
    constructor(private _editor: EditorService) {
        this._selected = _editor.current;
    }

    /**
     * Getter for the @type {Exhibition}.
     */
    get exhibition(): Exhibition {
        return this._editor.current;
    }

    /**
     * Getter for the selected element.
     */
    get selected(): (Exhibition | Room | Wall | Exhibit) {
        return this._selected;
    }

    /**
     * Returns the name of type of the currently selected element.
     *
     * @return Type of the selected element.
     */
    get selectedType(): string {
        if (this._selected instanceof Exhibit) {
            return 'Exhibit';
        } else if (this._selected instanceof Exhibition) {
            return 'Exhibition';
        } else if (this._selected instanceof Room) {
            return 'Room';
        } else if (this._selected instanceof Wall) {
            return 'Wall';
        } else {
            return 'Nothing';
        }
    }


    /**
     *
     */
    get isSelectedExhibition() {
        return this._selected instanceof Exhibition;
    }

    /**
     *
     */
    get isSelectedRoom() {
        return this._selected instanceof Room;
    }

    /**
     *
     */
    get isSelectedWall() {
        return this._selected instanceof Wall;
    }

    /**
     *
     */
    get isSelectedExhibit() {
        return this._selected instanceof Exhibit;
    }
}
