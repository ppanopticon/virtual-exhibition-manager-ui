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
     * Getter for the inspected element.
     */
    get inspected(): (Exhibition | Room | Wall | Exhibit) {
        return this._editor.inspected;
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
}
