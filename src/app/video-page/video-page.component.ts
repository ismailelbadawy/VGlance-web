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
  currentTime = 0;
  currentSegment = null;

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
    }, 1000);
  }

  _seekToSegment(index: number) {
    
    if (!this.player) {
      
    } else {
      this.player.seekTo(this.video.segments.map(s => s.start_time)[index]);
      this.currentSegment = index;
      this.currentTime = this.video.segments[index].start_time;
    }

  }

  readyToPlay(input) {
    this.video.title = this.player.getVideoData().title;
    let timeupdater = setInterval(this.updateTime.bind(this, this), 1000);
  }

  updateTime(obj) {
    let oldTime = this.currentTime;
    if(this.player && this.player.getCurrentTime) {
      this.currentTime = this.player.getCurrentTime();
    }
    if(this.currentTime !== oldTime) {
      this.mayChangeSegment(this.currentTime);
    }
  }

  stateChanged(event) {

  }

  mayChangeSegment(currentTime : number) {
    console.log(this.currentTime);
    console.log(this.video.segments.map(s => s.start_time));
    for(let i = 0; i < this.video.segments.length; i++) {
      if(this.currentTime > this.video.segments[i].start_time) {
        console.log(`Setting ${i}`)
        this.currentSegment = i;
      }else {
        break;
      }
    }
  }

}
