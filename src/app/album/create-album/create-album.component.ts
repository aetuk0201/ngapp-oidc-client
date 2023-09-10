import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {
  albumTitle = 'The Groove';
  description = 'Life is groovey..';
  owner = 'Eric Right';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
