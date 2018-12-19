import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateSeshComponent } from './create-sesh/create-sesh.component';
import { JoinSeshComponent } from './join-sesh/join-sesh.component';
import { SeshRoomComponent } from './sesh-room/sesh-room.component';
import { HomeComponent } from './home/home.component';
import { SongSearchComponent } from './song-search/song-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSeshComponent,
    JoinSeshComponent,
    SeshRoomComponent,
    HomeComponent,
    SongSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }
