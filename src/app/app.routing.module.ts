import { CreateAlbumComponent } from './album/create-album/create-album.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SigninRedirectCallbackComponent } from './core/signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './core/signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'

  },
  { path: 'home', component: HomeComponent },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'createalbum', component: CreateAlbumComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
