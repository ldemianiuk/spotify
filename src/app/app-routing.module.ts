import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {RedirectComponent} from './redirect/redirect.component';
import {PlayslistsComponent} from './playslists/playslists.component';
import {TrackListComponent} from './track-list/track-list.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  {path: '', component: RedirectComponent},
  {path: 'callback', component: AuthComponent},
  {path: 'home', component: AuthComponent},
  {path: 'user', component: UserComponent},
  {path: 'playlists', component: PlayslistsComponent},
  {path: 'tracks/:name', component: TrackListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
