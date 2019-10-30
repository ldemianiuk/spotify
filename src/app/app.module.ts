import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PlayslistsComponent } from './playslists/playslists.component';
import {FormsModule} from '@angular/forms';
import { TrackListComponent } from './track-list/track-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RedirectComponent,
    PlayslistsComponent,
    TrackListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
