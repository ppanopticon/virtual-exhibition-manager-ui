import {Injectable} from '@angular/core';
import {VremApiService} from '../http/vrem-api.service';
import {Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {Exhibition} from '../../model/implementations/exhibition.model';
import {Exhibit} from '../../model/implementations/exhibit.model';
import {Wall} from '../../model/implementations/wall.model';
import {Room} from '../../model/implementations/room.model';

@Injectable()
export class EditorService {

    /** Reference to the currently active @type {Exhibition}. */
    private _activeExhibition: Exhibition = null;

    /** Reference to the currently inspected element. May be the Exhibition, a Room, Wall or individual Exhibit. */
    private _inspectedElement: (Exhibition | Room | Wall | Exhibit);

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
        return this._activeExhibition;
    }

    /**
     * Getter for the inspected element.
     */
    get inspected(): (Exhibition | Room | Wall | Exhibit) {
        return this._inspectedElement;
    }

    /**
     * Getter for the ID of the currently active {Exhibition}
     */
    get currentId(): (string | null) {
        if (this._activeExhibition) {
            return this._activeExhibition.id;
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
        return this._api.save(this._activeExhibition).pipe(
            first(),
            tap(e => {
                this._activeExhibition = Exhibition.copy(e);
                this._inspectedElement = this._activeExhibition;
            }),
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
            tap( e => {
                this._activeExhibition = Exhibition.copy(e);
                this._inspectedElement = this._activeExhibition;
            }),
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
        if (this._activeExhibition) {
            return this.load(this._activeExhibition.id);
        } else {
            return of(false);
        }
    }
}
