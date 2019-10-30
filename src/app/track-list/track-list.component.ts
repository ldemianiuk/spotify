import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {StateService} from '../state.service';

class Track {
  id: string;
  upc: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  popularity: number;
  genres: string[] = [];
  bpm = 0;

  constructor() {
  }
}

@Component({
  selector: 'app-playlist',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {
  tracks: Track[];
  name: string;

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute,
              private state: StateService) {
  }

  ngOnInit() {
    this.tracks = [];
    this.name = this.route.snapshot.paramMap.get('name ');
    this.state.tracks.subscribe(tracks => {
      for (const track of tracks) {
        this.addTrack(track);;
      }
      this.getArtists();
      this.getAudioFeatures();
      this.getAlbums();
    });
  }

  private addTrack(spotifyTrack: SpotifyApi.TrackObjectFull) {
    const track = new Track();
    track.id = spotifyTrack.id;
    track.name = spotifyTrack.name;
    track.artist = spotifyTrack.artists[0].name;
    track.artistId = spotifyTrack.artists[0].id;
    track.album = spotifyTrack.album.name;
    track.albumId = spotifyTrack.album.id;
    track.duration = spotifyTrack.duration_ms;
    track.popularity = spotifyTrack.popularity;

    this.tracks.push(track);
  }

  private getArtists() {
    for (const track of this.tracks) {
      this.spotify.getArtist(track.artistId).subscribe(artist => {
        track.genres = artist.genres;
      });
    }
  }

  private getAudioFeatures() {
    for (const track of this.tracks) {
      this.spotify.getAudioFeatures(track.id).subscribe(features => {
        track.bpm = features.tempo;
      });
    }
  }

  private getAlbums() {
    for (const track of this.tracks) {
      this.spotify.getAlbum(track.albumId).subscribe(album => {
        track.upc = album.external_ids.upc;
      });
    }
  }
}
