import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  video = null;

  linkFormControl = new FormControl('', [Validators.required]);
  titles = [
    'Trouble',
    'Fix You',
    'Viva La Vida',
    'Speed of Sound',
    'Every Teardrop Is a Waterfall',
    'The Scientist',
    'Clocks'
  ];
  constructor() { 

  }

  ngOnInit() {
  }

  getVideo() : Promise<void> {
    this.isLoading = true;
    console.log('Started loading...')
    return new Promise(resolve => setTimeout(() => {
      
      this.video = {
        id : "bla",
        link : "https://www.youtube.com/embed/" + this.getId(this.linkFormControl.value as string)
      };
      console.log(this.video);
      this.isLoading = false;
      console.log('Done loading...')
      resolve();
    }, 2000));
  }
  
  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
  
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
}


