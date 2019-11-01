import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {StateService} from '../state.service';
import {flatMap, mergeAll, mergeMap} from 'rxjs/operators';
import {asyncScheduler, of, range, zip} from 'rxjs';

class Track {
  index: number;
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
  bpm : number;
  date: Date;

  constructor() {
  }
}

class Average {
  private sum = 0;
  private count = 0;
  average = 0;

  add(n: number) {
    this.sum += n;
    this.count += 1;
    this.average = this.sum / this.count;
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
  avgBpm = new Average();
  avgPopularity = new Average();
  avgDuration = new Average();
  genres = new Map();

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute,
              private state: StateService) {
  }

  ngOnInit() {
    this.tracks = [];
    this.name = decodeURIComponent(this.route.snapshot.paramMap.get('name'));
    this.state.tracks.subscribe(tracks => {
      const index$ = range(0, Infinity, asyncScheduler);
      const album$ = this.spotify.getAlbums(tracks.map(track => track.album.id)).pipe(flatMap(x => of(...x.albums)));
      const artist$ = this.spotify.getArtists(tracks.map(track => track.artists[0].id)).pipe(flatMap(x => of(...x.artists)));
      const feature$ = this.spotify.getTracksAudioFeatures(tracks.map(track => track.id))
        .pipe(flatMap(x => of(...x.audio_features)));
      const track$ = of(...tracks);
      zip(index$, track$, album$, artist$, feature$).subscribe(
        ([index, track, album, artist, features]) => this.addTrack(index, track, album, artist, features));
    });
  }

  private addTrack(index: number,
                   spotifyTrack: SpotifyApi.TrackObjectFull,
                   album: SpotifyApi.AlbumObjectFull,
                   artist: SpotifyApi.ArtistObjectFull,
                   features: SpotifyApi.AudioFeaturesObject) {
    const track = new Track();
    track.index = index;
    track.id = spotifyTrack.id;
    track.name = spotifyTrack.name;
    track.artist = spotifyTrack.artists[0].name;
    track.artistId = spotifyTrack.artists[0].id;
    track.album = spotifyTrack.album.name;
    track.albumId = spotifyTrack.album.id;
    track.date = new Date(album.release_date);
    track.duration = spotifyTrack.duration_ms;
    this.avgDuration.add(track.duration);
    track.popularity = spotifyTrack.popularity;
    this.avgPopularity.add(track.popularity);
    track.genres = artist.genres;
    track.genres.forEach(genre => this.genres.set(genre, 1 + (this.genres.get(genre) || 0)));
    track.bpm = features.tempo;
    track.upc = album.external_ids.upc;
    track.artist = artist.name;
    this.tracks.push(track);
  }

  private sortByPopularity() {
    this.tracks.sort((x, y) => y.popularity - x.popularity);
  }

  private sortByIndex() {
    this.tracks.sort((x, y) => x.index - y.index);
  }

  private sortByDate() {
    this.tracks.sort((x, y) => x.date.getTime() - y.date.getTime());
  }

  private genresList(): string {
    return [...this.genres.entries()].sort((x, y) => y[1] - x[1]).map(([key, val]) => `${key}(${val})`).join(', ');
  }

}


