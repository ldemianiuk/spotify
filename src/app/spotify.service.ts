import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getPlaylists() {
    return this.spotifyRequest('https://api.spotify.com/v1/me/playlists');
  }

  getUser() {
    return this.spotifyRequest('https://api.spotify.com/v1/me');
  }

  getPlaylist(id) {
    return this.spotifyRequest(`https://api.spotify.com/v1/playlists/${id}`);
  }

  spotifyRequest(url) {
    const token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Authorization': `Bearer ${token}`})};
    return this.http.get(url, httpOptions);
  }

}
