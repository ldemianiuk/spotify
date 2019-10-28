import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-playslists',
  templateUrl: './playslists.component.html',
  styleUrls: ['./playslists.component.css']
})
export class PlayslistsComponent implements OnInit {
  playlists: object[];

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
    this.spotify.getUser().subscribe(user => console.log(user));
    this.spotify.getPlaylists().subscribe(playlists => this.playlists = playlists.items);
  }


}
