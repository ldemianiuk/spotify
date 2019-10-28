import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-playslists',
  templateUrl: './playslists.component.html',
  styleUrls: ['./playslists.component.css']
})
export class PlayslistsComponent implements OnInit {
  playlists: object[];
  selectedPlaylist: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUser().subscribe(user => console.log(user));
    this.getPlaylists().subscribe(playlists => this.playlists = playlists.items);
  }

  getPlaylists() {
    return this.spotifyRequest('https://api.spotify.com/v1/me/playlists');
  }

  getUser() {
    return this.spotifyRequest('https://api.spotify.com/v1/me');
  }


  spotifyRequest(url) {
    const token = localStorage.getItem('token');
    const httpOptions = {headers: new HttpHeaders({'Authorization': `Bearer ${token}`})};
    return this.http.get(url, httpOptions);
  }

  onPlaylistChange() {
    console.log(this.selectedPlaylist);
  }
}
