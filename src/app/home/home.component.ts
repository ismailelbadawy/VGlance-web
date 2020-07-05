import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  segmentIndex: BehaviorSubject<number>;

  isLoading = false;
  video = null;

  linkFormControl = new FormControl('', [Validators.required]);

  player: any;

  titles = [
    'Trouble',
    'Fix You',
    'Viva La Vida',
    'Speed of Sound',
    'Every Teardrop Is a Waterfall',
    'The Scientist',
    'Clocks'
  ];

  startTimes = [
    0,
    37,
    70,
    87,
    109,
    127,
    156
  ];

  segmenters = [
    'Text Tiling',
    'C99'
  ]

  titlers = [
    'DTATG',
    'BERT'
  ]

  currentTitle: string = "";
  tags: string = "";
  startAt = null;


  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  async getVideo(): Promise<void> {
    this.isLoading = true;
    try {
      let id = this._getId(this.linkFormControl.value as string);
      let segments = await this._videosService.segmentVideo(id, 'TEXT_TILING', 'DTATG');
      this.titles = segments.map(s => s.title);
      this.startTimes = segments.map(s => s.start_time);
      this.video = {
        id: id,
        link: "https://www.youtube.com/embed/" + id,
        segments: segments
      };
      this.currentTitle = this.video.segments[0].title;
      this.tags = (this.video.segments[0].tags as string[]).join(', ');
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  _getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  _seekToSegment(index: number) {
    this.currentTitle = this.video.segments[index].title;
    this.tags = (this.video.segments[index].tags as string[]).join(', ');
    console.log(`Seeking to ${index}`)
    let wind: any = window;
    if (!this.player) {
      this.player = new wind.YT.Player('yPlayer', {
        events: {
          'onReady': this.readyToPlay.bind(null, index, this.startTimes[index]),
          'onStateChange': this.stateChanged
        }
      })
    } else {
      this.player.seekTo(this.startTimes[index]);
    }

  }

  readyToPlay(times, seek, event) {
    console.log(seek, event)
    event.target.seekTo(seek)
  }

  stateChanged(event) {

  }

  constructor(private _videosService: VideosService) {
    this.segmentIndex = new BehaviorSubject<number>(-1);
    this.segmentIndex.subscribe(s => {
      if (s == -1) {
        return;
      }
      this._seekToSegment(s);
    });
  }
}