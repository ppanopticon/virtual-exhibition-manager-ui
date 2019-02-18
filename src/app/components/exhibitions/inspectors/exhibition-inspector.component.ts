import {Component, Input} from '@angular/core';
import {Exhibition} from '../../../model/implementations/exhibition.model';

@Component({
    selector: 'app-exhibition-inspector',
    templateUrl: './exhibition-inspector.component.html'
})
export class ExhibitionInspectorComponent {
    @Input('exhibition')
    private _exhibition: Exhibition = null;

    /**
     * Default constructor.
     */
    constructor() {}

    /**
     * Getter for the
     */
    get exhibition(): Exhibition {
        return this._exhibition;
    }
}
