import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss']
})
export class AlbumFormComponent implements OnInit {
  @Input()
  title!: string;
  @Input() description = '';
  @Input() owner = '';

  albumForm!: FormGroup;  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm(): void {
  
  this.albumForm = this.fb.group({
    title: [this.title, Validators.required],
    description: [this.description],
    owner: [this.owner]
  });
  }

  onSubmit(): void {

    if (this.albumForm.valid) {
      alert('yay!');
    }
    
  }


}
