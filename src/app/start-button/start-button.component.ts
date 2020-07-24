import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { VideosService } from '../services/videos.service';
import { Router } from '@angular/router';
import { Video } from '../models/video.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-start-button',
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.scss']
})
export class StartButtonComponent implements OnInit {
  @Input('isLoadingSubject') private _loadingSubject: Subject<boolean>;

  expand = false;

  constructor(private _videoService: VideosService, private _router : Router) { }

  ngOnInit() {
  }

  linkFromControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/),
  ]);

  segmentationFormControl = new FormControl('', Validators.required);
  segmentationMethods = [
    { name: 'Text Tiling', param: '' },
    { name: 'Semantic Analysis', param: 'Meow!' }
  ];

  titleFormControl = new FormControl('', Validators.required);
  titleMethods = [
    { name: 'Encoder Decoder', param: '' },
    { name: 'Universal Sentence Encoder', param: 'USE' },
    { name: 'BERT', param: 'BERT' }
  ];

  tagFormControl = new FormControl('', Validators.required);
  tagMethods = [
    { name: 'Modified DTATG', param: 'DTATG' },
    { name: 'Hybrid Tagging method', param: 'HYBRID' }
  ];

  matcher = new MyErrorStateMatcher();


  analyzeVideo() {
    this._loadingSubject.next(true);
    let videoId = this._getId(this.linkFromControl.value);
    this._videoService.segmentVideo(videoId, this.segmentationFormControl.value.param, this.titleFormControl.value.param)
    .then(s => {
      let video : Video = {
        id : videoId,
        link : "https://www.youtube.com/embed/" + videoId,
        segments : s,
        title : ''
      }
      this._router.navigate(['/video'], {state : video});
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      this._loadingSubject.next(false);
    }); 
  }

  private _getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
}
