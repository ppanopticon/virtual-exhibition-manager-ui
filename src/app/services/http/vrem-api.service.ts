import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExhibitionSummary} from '../../model/interfaces/exhibition/exhibition-summary.interface';
import {RestfulService} from './restful.service';
import {first, map} from 'rxjs/operators';
import {ListExhibitionResponse} from '../../model/responses/list-exhibition-response.interface';
import {IExhibition} from '../../model/interfaces/exhibition/exhibition.interface';

@Injectable()
export class VremApiService extends RestfulService {

    /**
     *
     * @param _httpClient
     */
    constructor(@Inject(HttpClient) _httpClient: HttpClient) {
        super(_httpClient);
    }

    /**
     * Uses to API to query for a list of the stored @type {Exhibition}s and returns them as @type {ExhibitionSummary}
     *
     * @return Observable<ExhibitionSummary[]>
     * */
    public list(): Observable<ExhibitionSummary[]> {
        return this.get<ListExhibitionResponse>('exhibitions/list').pipe(map(r => r.exhibitions));
    }

    /**
     * Uses to API to query for a specific @type {Exhibition}s and returns it
     *
     * @param id string The ID of the desired {Exhibition}
     * @return Observable<Exhibition>
     * */
    public load(id: string): Observable<IExhibition> {
        return this.get<IExhibition>('exhibitions/load/' + id).pipe(first());
    }
}