import {Component, OnInit} from '@angular/core';
import {SpotifyService} from './spotify.service';
import {ActivatedRoute} from '@angular/router';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spotify';

  constructor() {
  }

  ngOnInit() {

  }
}
