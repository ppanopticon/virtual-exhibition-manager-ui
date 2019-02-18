import {ChangeDetectionStrategy, Component} from '@angular/core';
import {VremApiService} from '../../../services/http/vrem-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Exhibition} from '../../../model/interfaces/exhibition.model';
import {Observable} from 'rxjs';
import {flatMap, map, share} from 'rxjs/operators';


@Component({
    selector: 'app-edit-exhibitions',
    templateUrl: 'edit-exhibition.component.html',
    styleUrls: ['edit-exhibition.component.scss']
})
export class EditExhibitionComponent {
    private _exhibition: Observable<Exhibition>;

    /**
     *
     * @param _api
     * @param _router
     * @param _activated
     */
    constructor(private _api: VremApiService, _router: Router, _activated: ActivatedRoute) {
        this._exhibition = _activated.params.pipe(
            map(p => p['exhibitionId']),
            flatMap(id => this._api.load(id)),
            share()
        );
    }

    /**
     * Getter for the
     */
    get exhibition(): Observable<Exhibition> {
        return this._exhibition;
    }
}
