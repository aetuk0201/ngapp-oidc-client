import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { CreateAlbumResponse } from './create-album-response';
import { UpdateAlbumResponse } from './update-album-response';
import { DeleteAlbumResponse } from './delete-album-response';
import { Constants } from '../../core/constants';
import { Album } from '../album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {
  _apiUrl: string;
  _getAlbumUrl: string = '';
  private _url: string = '';

  constructor(private http: HttpClient) {

    this._apiUrl = Constants.apiRoot + Constants.getAlbumsEndPoint;
  }
  
  getAlbums(page:number, pageSize:number): Observable<Album[]> {

    this._url = `${Constants.apiRoot}${Constants.getAlbumsEndPoint}?page=${page}&pageSize=${pageSize}`;

    return this.http.get<Album[]>(this._url)
                    .pipe(catchError(err => this.handleError(err)));
  }

  getAlbum(albumId:number): Observable<Album> {
    this._getAlbumUrl = Constants.apiRoot + Constants.getAlbumEndPoint + "/" + albumId;
    return this.http.get<Album>(this._getAlbumUrl)
                    .pipe(catchError(err => this.handleError(err)));
  }

  createAlbum(album: Album, albumGuid: Guid): Observable<CreateAlbumResponse> {

    let url =`${Constants.apiRoot}${Constants.createAlbumEndPoint}/${albumGuid}`;

    return this.http.post<CreateAlbumResponse>(url, album)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateAlbum(album: Album): Observable<UpdateAlbumResponse> {

    let updateAlbumUrl = Constants.apiRoot + Constants.updateAlbumEndPoint;

    return this.http.put<UpdateAlbumResponse>(updateAlbumUrl, album)
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteAlbum(id: number): Observable<DeleteAlbumResponse> {

    let deleteAlbumUrl = Constants.apiRoot + Constants.deleteAlbumEndPoint + '/' + id;

    return this.http.delete<DeleteAlbumResponse>(deleteAlbumUrl)
      .pipe(catchError(err => this.handleError(err)));
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    return throwError(err);
  }
}


