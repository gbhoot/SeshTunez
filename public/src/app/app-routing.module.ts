import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSeshComponent } from './create-sesh/create-sesh.component';
import { JoinSeshComponent } from './join-sesh/join-sesh.component';
import { SeshRoomComponent } from './sesh-room/sesh-room.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sesh/:id', component: SeshRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
