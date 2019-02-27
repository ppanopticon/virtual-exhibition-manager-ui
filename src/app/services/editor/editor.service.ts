import {Injectable} from '@angular/core';
import {VremApiService} from '../http/vrem-api.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {Exhibition} from '../../model/implementations/exhibition.model';
import {Exhibit} from '../../model/implementations/exhibit.model';
import {Wall} from '../../model/implementations/wall.model';
import {Room} from '../../model/implementations/room.model';

@Injectable()
export class EditorService {

    /** Reference to the currently active @type {Exhibition}. */
    private _activeExhibition: BehaviorSubject<Exhibition> = new BehaviorSubject(null);

    /** Reference to the currently inspected element. May be the Exhibition, a Room, Wall or individual Exhibit. */
    private _inspectedElement: BehaviorSubject<(Exhibition | Room | Wall | Exhibit)> = new BehaviorSubject(null);

    /** A flag indicating, whether this {EditorService} has unsaved changes. */
    private _dirty: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
        return this._activeExhibition.value;
    }

    /**
     * Getter for the current dirty value.
     */
    get dirty(): boolean {
        return this._dirty.getValue();
    }

    /**
     * Getter for the dirty Observable.
     */
    get dirtyObservable(): Observable<boolean> {
        return this._dirty.asObservable();
    }

    /**
     * Returns an {Observable} of the inspected element.
     *
     * @return {Observable<Exhibition>}
     */
    get currentObservable(): Observable<Exhibition> {
        return this._activeExhibition.asObservable();
    }

    /**
     * Getter for the inspected element.
     */
    get inspected(): (Exhibition | Room | Wall | Exhibit) {
        return this._inspectedElement.value;
    }

    /**
     * Returns an {Observable} of the inspected element.
     *
     * @return {Observable<(Exhibition | Room | Wall | Exhibit)>}
     */
    get inspectedObservable(): Observable<(Exhibition | Room | Wall | Exhibit)> {
        return this._inspectedElement.asObservable();
    }

    /**
     * Setter for the inspected element.
     *
     * @param value The new inspected element.
     */
    set inspected(value: (Exhibition | Room | Wall | Exhibit)) {
        this._inspectedElement.next(value);
    }

    /**
     * Getter for the ID of the currently active {Exhibition}
     */
    get currentId(): (string | null) {
        if (this._activeExhibition.value) {
            return this._activeExhibition.value.id;
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
        return this._api.save(this._activeExhibition.value).pipe(
            first(),
            tap(e => {
                this._activeExhibition.next(
                    Exhibition.copyAsProxy(e, {set: (o, p, v) => this.handleSet(o, p, v), deleteProperty: (o, t) => this.handleDelete(o, t)})
                );
                this._dirty.next(false);
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
                this._activeExhibition.next(
                    Exhibition.copyAsProxy(e, {set: (o, p, v) => this.handleSet(o, p, v), deleteProperty: (o, t) => this.handleDelete(o, t)})
                );
                this._dirty.next(false);
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
            return this.load(this._activeExhibition.value.id);
        } else {
            return of(false);
        }
    }

    /**
     * Getter-handler for Proxy object. Simply returns the requested parameter and wraps array and object in Proxys.
     *
     * @param obj The target object.
     * @param prop The target property.
     */
    private handleDelete(obj, prop) {
        delete obj[prop];
        this._dirty.next(true);
        return true;
    }

    /**
     * Setter-handler for Proxy object. Sets the local dirty flag.
     *
     * @param obj The target object.
     * @param prop The target attribute.
     * @param value The new value.
     */
    private handleSet(obj, prop, value): boolean {
        obj[prop] = value;
        this._dirty.next(true);
        return true;
    }
}
