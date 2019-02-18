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
    /** */
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
     * Getter for the
     */
    get exhibition(): Exhibition {
        return this._editor.current;
    }

    /**
     *
     */
    get selected(): (Exhibition | Room | Wall | Exhibit) {
        return this._selected;
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
        return this._selected instanceof Exhibition;
    }

    /**
     *
     */
    get isSelectedWall() {
        return this._selected instanceof Exhibition;
    }

    /**
     *
     */
    get isSelectedExhibit() {
        return this._selected instanceof Exhibition;
    }
}
