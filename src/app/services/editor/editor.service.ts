import {Injectable} from '@angular/core';
import {VremApiService} from '../http/vrem-api.service';
import {Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {Exhibition} from '../../model/implementations/exhibition.model';

@Injectable()
export class EditorService {

    /** Reference to the currently active exhibition. */
    private _active: Exhibition = null;

    /**
     *
     * @param _api
     */
    constructor(private _api: VremApiService) {}

    /**
     *
     */
    get current(): (Exhibition | null) {
        return this._active;
    }

    /**
     *
     */
    get currentId(): (string | null) {
        if (this._active) {
            return this._active.id;
        } else {
            return null;
        }
    }

    /**
     *
     * @param id
     */
    public load(id: string): Observable<boolean> {
        return this._api.load(id).pipe(
            first(),
            tap( e => this._active = Exhibition.copy(e)),
            map(e => true),
            catchError(() => of(false))
        );
    }

    /**
     *
     */
    public reload(): Observable<boolean> {
        if (this._active) {
            return this.load(this._active.id);
        } else {
            return of(false);
        }
    }
}
