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
    this.spotify.getPlaylists().subscribe(playlists => {
      this.playlists = playlists.items;
    });
  }

    goToTracks(p: SpotifyApi.PlaylistObjectSimplified) {
      this.state.tracks = this.spotify.getPlaylistTracks(p.id, p.tracks.total).pipe(map(result =>
        result.items.map(track => track.track).filter(track => track.id !== null)
      ));
      this.router.navigate([`/tracks/${encodeURIComponent(p.name)}`]);
  }
}
