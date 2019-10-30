import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  tracks: SpotifyApi.PlaylistTrackObject[];
  features: SpotifyApi.AudioFeaturesObject[];
  artists: SpotifyApi.ArtistObjectFull[];
  name: string;

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute) {
    this.features = [];
    this.artists = [];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.spotify.getPlaylist(id).subscribe(res => {
      this.tracks = res.tracks.items;
      this.name = res.name;
      for (const i in this.tracks) {
        this.spotify.getAudioFeatures(this.tracks[i].track.id).subscribe(result => {
          this.features[i] = result;
        });
        this.spotify.getArtist(this.tracks[i].track.artists[0].id).subscribe(result => {
          this.artists[i] = result;
        });
      }
    });

  }


}
