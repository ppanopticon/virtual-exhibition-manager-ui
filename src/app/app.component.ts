import {Component} from '@angular/core';
import {VremApiService} from './services/http/vrem-api.service';
import {from, Observable} from 'rxjs';
import {ExhibitionSummary} from './model/interfaces/exhibition-summary.model';
import {Router, RoutesRecognized} from '@angular/router';
import {share} from 'rxjs/operators';
import {EditorService} from './services/editor/editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** Observable containing the available @type {ExhibitionSummary} objects. */
  private _exhibitions: Observable<ExhibitionSummary[]>;

  /**
   *
   * @param _api
   * @param _editor
   * @param _router
   */
  constructor(private _api: VremApiService, private _editor: EditorService, private _router: Router) {
    this._exhibitions = this._api.list().pipe(share());
  }

  /**
   * Getter for the current @type {ExhibitionSummary}.
   */
  get title(): string {
      if (this._editor.current) {
        return 'Exhibition: ' + this._editor.current.name;
      } else {
        return 'Please select an exhibition...';
      }
  }

  /**
   * Getter for the list of available @type {ExhibitionSummary} objects
   */
  get exhibitions(): Observable<ExhibitionSummary[]> {
    return this._exhibitions;
  }

  /**
   * Handles the user clicking (i.e. selecting) an @type {Exhibition} from
   * the list of available @type {Exhibitions}s; causes the application to navigate.
   *
   * @param summary The selected ExhibitionSummary
   */
  public handleClick(summary: ExhibitionSummary) {
    this._router.navigate([summary.objectId]);
  }
}
