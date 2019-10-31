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
  date: string;

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

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute,
              private state: StateService) {
  }

  ngOnInit() {
    this.tracks = [];
    this.name = this.route.snapshot.paramMap.get('name ');
    this.state.tracks.subscribe(tracks => {
      const album$ = this.spotify.getAlbums(tracks.map(track => track.album.id)).pipe(flatMap(x => of(...x.albums)));
      const track$ = of(...tracks);
      zip(range(0, Infinity, asyncScheduler), track$, album$).subscribe(([index, track, album]) => this.addTrack(index, track, album));
      //tracks.forEach((track, index) => this.addTrack(track, index));

      /*
      this.getArtists();
      this.getAudioFeatures();
      this.getAlbums();
       */
    });
  }

  private addTrack(index: number, spotifyTrack: SpotifyApi.TrackObjectFull, album: SpotifyApi.AlbumObjectFull) {
    const track = new Track();
    track.index = index;
    track.id = spotifyTrack.id;
    track.name = spotifyTrack.name;
    track.artist = spotifyTrack.artists[0].name;
    track.artistId = spotifyTrack.artists[0].id;
    track.album = spotifyTrack.album.name;
    track.albumId = spotifyTrack.album.id;
    track.date = album.release_date;
    track.duration = spotifyTrack.duration_ms;
    this.avgDuration.add(track.duration);
    track.popularity = spotifyTrack.popularity;
    this.avgPopularity.add(track.popularity);

    this.tracks.push(track);
  }

  private sortByPopularity() {
    this.tracks.sort((x, y) => y.popularity - x.popularity);
  }

  private sortByIndex() {
    this.tracks.sort((x, y) => x.index - y.index);
  }

}


