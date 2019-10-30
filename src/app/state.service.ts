import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  tracks: Observable<SpotifyApi.TrackObjectFull[]>;

  constructor() {
  }
}
