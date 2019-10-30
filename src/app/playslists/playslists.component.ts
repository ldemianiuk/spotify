import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {map} from 'rxjs/operators';
import {StateService} from '../state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playslists',
  templateUrl: './playslists.component.html',
  styleUrls: ['./playslists.component.css']
})
export class PlayslistsComponent implements OnInit {
  playlists: SpotifyApi.PlaylistObjectSimplified[];

  constructor(private spotify: SpotifyService,
              private state: StateService,
              private router: Router) { }

  ngOnInit() {
    this.spotify.getUser().subscribe(user => console.log(user));
    this.spotify.getPlaylists().subscribe(playlists => this.playlists = playlists.items);
  }

  goToTracks(id: string, name: string) {
    this.state.tracks = this.spotify.getPlaylist(id).pipe(map(result =>
      result.tracks.items.map(track => track.track)
    ));
    this.router.navigate([`/tracks/${name}`]);
  }
}
