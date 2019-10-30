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

  getPlaylist(id: string): Observable<SpotifyApi.PlaylistObjectFull> {
    return this.spotifyRequest(`https://api.spotify.com/v1/playlists/${id}`) as Observable<SpotifyApi.PlaylistObjectFull>;
  }

  getAudioFeatures(id: string): Observable<SpotifyApi.AudioFeaturesObject> {
    return this.spotifyRequest(`https://api.spotify.com/v1/audio-features/${id}`) as Observable<SpotifyApi.AudioFeaturesObject>;
  }

  getArtist(id: string): Observable<SpotifyApi.ArtistObjectFull> {
    return this.spotifyRequest(`https://api.spotify.com/v1/artists/${id}`) as Observable<SpotifyApi.ArtistObjectFull>;
  }

  getAlbum(id: string): Observable<SpotifyApi.AlbumObjectFull> {
    return this.spotifyRequest(`https://api.spotify.com/v1/albums/${id}`) as Observable<SpotifyApi.AlbumObjectFull>;
  }

  spotifyRequest(url) {
    const token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({Authorization: `Bearer ${token}`})};
    return this.http.get(url, httpOptions);
  }

}
