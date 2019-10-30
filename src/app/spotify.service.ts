/// <reference types="@types/spotify-api" />

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  getPlaylists(): Observable<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>> {
    return this.spotifyRequest('https://api.spotify.com/v1/me/playlists') as
      Observable<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>>;
  }

  getUser(): Observable<SpotifyApi.UserProfileResponse> {
    return this.spotifyRequest('https://api.spotify.com/v1/me') as Observable<SpotifyApi.UserProfileResponse>;
  }

  getPlaylist(id): Observable<SpotifyApi.PlaylistObjectFull> {
    return this.spotifyRequest(`https://api.spotify.com/v1/playlists/${id}`) as Observable<SpotifyApi.PlaylistObjectFull>;
  }

  spotifyRequest(url) {
    const token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({Authorization: `Bearer ${token}`})};
    return this.http.get(url, httpOptions);
  }

}
