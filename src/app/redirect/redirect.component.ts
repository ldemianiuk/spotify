import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  private authUri = 'https://accounts.spotify.com/authorize?client_id=782a07aee5eb4fc998d10553c0c3b439&redirect_uri=http://localhost:4200/callback&scope=user-read-private%20user-read-email&response_type=token&state=123';
  constructor() { }

  ngOnInit() {
    document.location.href = this.authUri;
  }

}
