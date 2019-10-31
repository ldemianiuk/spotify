/// <reference types="@types/spotify-api" />

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {concat, Observable, of} from 'rxjs';
import {bufferCount, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiBaseUrl = 'https://api.spotify.com/v1';
  private MAX_GET_ALBUMS = 20;
  private MAX_GET_TRACKS = 100;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getPlaylists(): Observable<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>> {
    return this.spotifyRequest('/me/playlists');
  }

  getUser(): Observable<SpotifyApi.UserProfileResponse> {
    return this.spotifyRequest('/me');
  }

  getPlaylist(id: string): Observable<SpotifyApi.PlaylistObjectFull> {
    return this.spotifyRequest(`/playlists/${id}`);
  }

  getAudioFeatures(id: string): Observable<SpotifyApi.AudioFeaturesObject> {
    return this.spotifyRequest(`/audio-features/${id}`);
  }

  getArtist(id: string): Observable<SpotifyApi.ArtistObjectFull> {
    return this.spotifyRequest(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<SpotifyApi.AlbumObjectFull> {
    return this.spotifyRequest(`/albums/${id}`);
  }

  getPlaylistTracks(id: string, n: number): Observable<SpotifyApi.PlaylistTrackResponse> {
    const result: Observable<SpotifyApi.PlaylistTrackResponse>[] = [];
    for (let i = 0; i < n; i += this.MAX_GET_TRACKS) {
      result.push(this.spotifyRequest(`/playlists/${id}/tracks?offset=${i}`));
    }
    return concat(...result);
  }

  getAlbums(ids: string[]): Observable<SpotifyApi.AlbumObjectFull[]> {
    const result: Observable<SpotifyApi.AlbumObjectFull[]>[] = [];
    const id$ = of(...ids).pipe(bufferCount(this.MAX_GET_ALBUMS));
    id$.subscribe(batch => {
      const args = batch.join(',');
      result.push(this.spotifyRequest(`/albums/?ids=${args}`));
    });
    return concat(...result);
  }

  spotifyRequest<T>(endpoint: string): Observable<T> {
    const token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({Authorization: `Bearer ${token}`})};
    const result = this.http.get<T>(this.apiBaseUrl + endpoint, httpOptions);
    // tslint:disable-next-line:variable-name
    return result.pipe(tap(_data => {}, error => {
      if (error.status === 401) {
        this.router.navigate(['/']);
      }
    }));
  }

}
