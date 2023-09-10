import { AuthService } from './core/auth.service';
import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AlbumServiceService } from './album/services/album-service.service';
import { Album } from './album/album.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'family-affair';
  isLoggedIn = false;
  isLoginClicked = false;
  _albumGuid = Guid.create();

  constructor(private _authService: AuthService, private _albumService: AlbumServiceService) {
    
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    
      this._authService.isLoggedIn().then(loggedIn => {
        this.isLoggedIn = loggedIn;
      });
    
  }

  getAlbums() {
    let albums: Album[] = [];
    let page = 0;
    let pageSize = 20;

    this._albumService.getAlbums(page, pageSize).subscribe((result: Album[]) => {

      albums = result;
      console.log(albums);

    }, (error: any) => {

      console.log(error);

    });

  }

  getAlbum(albumId:number) {
    let album: Album;

    this._albumService.getAlbum(albumId).subscribe((result: Album) => {
      album = result;
      console.log(album);
    }, (error: any) => {

      console.log(error);
    });
  }
  
  createAlbum() {

    let album = new Album();
    album.title = 'testing...';
    album.description = 'desc..';
    album.owner = 'owner';

    this._albumService.createAlbum(album, this._albumGuid).subscribe(result => {
      console.log(result);

      this._albumGuid = Guid.create();
    }, (error: any) => {

      console.log(error);
    });

  }

  updateAlbum() {

    let album = new Album();
    album.id = 4;
    album.guidId = Guid.create().toString();
    album.title = '2nd updated testing...';
    album.description = '2nd updated desc..';
    album.owner = 'owner';

    this._albumService.updateAlbum(album).subscribe(result => {
      console.log(result);

    }, (error: any) => {

      console.log(error);
    });

  }

   deleteAlbum() {
    let albumId = 3;

    this._albumService.deleteAlbum(albumId).subscribe((result) => {
      console.log(result);
    }, (error: any) => {

      console.log(error);      
    });
     
  }

  handleAuthentication(loginClick: boolean) {
    
    if (loginClick) {
      this._authService.login();
    }
    
    if (!loginClick) {
      this._authService.logout();
    }

  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  
}


