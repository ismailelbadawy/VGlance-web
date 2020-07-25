import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  segmentIndexSubject: BehaviorSubject<number>;
  player: any;
  video: Video = null;

  constructor(private _router : Router) {
    this.segmentIndexSubject = new BehaviorSubject<number>(-1);
    this.segmentIndexSubject.subscribe(s => {
      if (s == -1) {
        return;
      }
      this._seekToSegment(s);
    });
   }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.video = history.state as Video;
    if(this.video.id == null ) {
      this._router.navigate(['/'])
    }
    setTimeout(() => {
      let wind: any = window;
      this.player = new wind.YT.Player('yPlayer', {
        events: {
          'onReady': this.readyToPlay.bind(this),
          'onStateChange': this.stateChanged
        }
      })
    }, 200);
  }

  _seekToSegment(index: number) {
    
    if (!this.player) {
      
    } else {
      this.player.seekTo(this.video.segments.map(s => s.start_time)[index]);
    }

  }

  readyToPlay(input) {
    console.log(input);
    this.video.title = this.player.getVideoData().title;
  }

  stateChanged(event) {

  }

}
