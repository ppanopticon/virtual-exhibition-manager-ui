import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {EditorService} from './services/editor/editor.service';

@Injectable({
    providedIn: 'root'
})
export class ExhibitionExistsGuard implements CanActivate {


    /**
     * Default constructor.
     *
     * @param _editor Reference to the EditorService
     */
    constructor(private _editor: EditorService) {}

    /**
     * Every time a new route is invoked, the 'exhibitionId' parameter is checked. If that parameter has changed
     * the @type {EditorService} will be used to reload the @type {Exhibition} associated with the routes new
     * 'exhibitionId'
     *
     * @param route The activated route (snapshot).
     * @param state The current route (snapshot).
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (route.paramMap.get('exhibitionId')) {
            if (this._editor.currentId === route.paramMap.get('exhibitionId')) {
                of(true);
            } else {
                return this._editor.load(route.paramMap.get('exhibitionId'));
            }
        } else {
            of(true);
        }
    }
}
