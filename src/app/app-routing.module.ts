import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {RedirectComponent} from './redirect/redirect.component';
import {PlayslistsComponent} from './playslists/playslists.component';


const routes: Routes = [
  {path: '', component: RedirectComponent},
  {path: 'callback', component: AuthComponent},
  {path: 'playlists', component: PlayslistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
