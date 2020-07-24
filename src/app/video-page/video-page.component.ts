import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  segmentIndexSubject: BehaviorSubject<number>;
  player: any;
  video: Video = null;

  constructor() {
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
    this.video = history.state as Video
  }

  _seekToSegment(index: number) {
    let wind: any = window;
    if (!this.player) {
      this.player = new wind.YT.Player('yPlayer', {
        events: {
          'onReady': this.readyToPlay.bind(null, index, this.video.segments.map(s => s.start_time)[index]),
          'onStateChange': this.stateChanged
        }
      })
    } else {
      this.player.seekTo(this.video.segments.map(s => s.start_time)[index]);
    }

  }

  readyToPlay(times, seek, event) {
    console.log(seek, event)
    event.target.seekTo(seek)
  }

  stateChanged(event) {

  }

}
