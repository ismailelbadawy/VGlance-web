import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

  startAt = null;
  constructor() {
    this.segmentIndex = new BehaviorSubject<number>(-1);
    this.segmentIndex.subscribe(s => {
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
  }

  getVideo(): Promise<void> {
    this.isLoading = true;
    return new Promise(resolve => setTimeout(() => {
      this.video = {
        id: this._getId(this.linkFormControl.value as string),
        link: "https://www.youtube.com/embed/" + this._getId(this.linkFormControl.value as string)
      };
      this.isLoading = false;
      resolve();
    }, 2000));
  }

  _getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  _seekToSegment(index: number) {
    console.log('Trying to do anyshit')
    let wind: any = window;
    if(!this.player) {
      this.player = new wind.YT.Player('yPlayer', {
        events: {
          'onReady': this.readyToPlay.bind(null, index, this.startTimes[index]),
          'onStateChange': this.stateChanged
        }
      })
    }else {
      this.player.seekTo(this.startTimes[index]);
    }
    
  }

  readyToPlay(times, seek, event) {
    console.log(seek, event)
    event.target.seekTo(seek)
  }

  stateChanged(event) {

  }
}


