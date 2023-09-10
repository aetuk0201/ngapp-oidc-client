import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumFormComponent } from './forms/album-form/album-form.component';

@NgModule({
  declarations: [
    AlbumComponent,
    CreateAlbumComponent,
    AlbumFormComponent    
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AlbumComponent
  ]
})
export class AlbumModule { }
