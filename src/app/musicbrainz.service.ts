import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import * as Musicbrainz from './musicbrainz.types';

@Injectable({
  providedIn: 'root'
})
export class MusicbrainzService {

  constructor(private http: HttpClient) { }

  searchBarcode(barcode: string) {
    return this.musicbrainzRequest(`https://musicbrainz.org/ws/2/release/?query=barcode:${barcode}&fmt=json`);
  }

  musicbrainzRequest(url): Observable<Musicbrainz.IReleaseList> {
    const result = this.http.get(url);
    // tslint:disable-next-line:variable-name
    return result.pipe(tap(_data => {}, _error => {})) as Observable<Musicbrainz.IReleaseList>;
  }
}

