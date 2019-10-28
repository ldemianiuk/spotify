import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private token: string;


  constructor(private route: ActivatedRoute) {
  }
}
