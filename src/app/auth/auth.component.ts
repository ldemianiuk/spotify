import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.location.hash) {
      const params = [];
      window.location.hash.substr(1).split('&').map(x => x.split('=')).map(x => params[x[0]] = x[1]);
      localStorage.setItem('token', params['access_token']);
      this.router.navigate(['/home']);
    }
  }

}
