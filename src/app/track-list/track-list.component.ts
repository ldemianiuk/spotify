import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {StateService} from '../state.service';

class Track {
  id: string;
  artist: string;
  title: string;
  duration: number;
  popularity: number;
  genres: string[];
  bpm: number;

  constructor(id: string, artist: string, title: string) {
    this.id = id;
    this.artist = artist;
    this.title = title;
  }
}

@Component({
  selector: 'app-playlist',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})

export class TrackListComponent implements OnInit {
  tracks: Observable<SpotifyApi.TrackObjectFull[]>;
  name: string;

  constructor(private spotify: SpotifyService,
              private route: ActivatedRoute,
              private state: StateService) {
  }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.tracks = this.state.tracks;
  }
}
