import {Injectable} from '@angular/core';
import {VremApiService} from '../http/vrem-api.service';
import {Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {Exhibition} from '../../model/implementations/exhibition.model';

@Injectable()
export class EditorService {

    /** Reference to the currently active @type {Exhibition}. */
    private _active: Exhibition = null;

    /**
     * Default constructor.
     *
     * @param _api Reference to the {VremApiService}.
     */
    constructor(private _api: VremApiService) {}

    /**
     * Getter for the currently active {Exhibition}
     */
    get current(): (Exhibition | null) {
        return this._active;
    }

    /**
     * Getter for the ID of the currently active {Exhibition}
     */
    get currentId(): (string | null) {
        if (this._active) {
            return this._active.id;
        } else {
            return null;
        }
    }

    /**
     * Saves the current state of the active @type {Exhibition}.
     *
     * @return An Observable that returns true on success and false otherwise.
     */
    public save(): Observable<boolean> {
        return this._api.save(this._active).pipe(
            first(),
            tap(e => this._active = Exhibition.copy(e)),
            map(e => true),
            catchError(() => of(false))
        );
    }

    /**
     * Loads the @type {Exhibition} with the given ID and makes it the active one.
     *
     * @param ID of the {Exhibition} that should be loaded.
     * @return An Observable that returns true on success and false otherwise.
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
     * Reloads the currently active {Exhibition}.
     *
     * @return An Observable that returns true on success and false otherwise.
     */
    public reload(): Observable<boolean> {
        if (this._active) {
            return this.load(this._active.id);
        } else {
            return of(false);
        }
    }
}
