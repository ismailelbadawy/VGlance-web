import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-landing',
  templateUrl: './new-landing.component.html',
  styleUrls: ['./new-landing.component.scss']
})
export class NewLandingComponent implements OnInit {
  isLoading : boolean = false;
  constructor() {
    this.isLoadingSubject.subscribe(s => {
      this.isLoading = s;
    }, (err) => {
      
    }, () =>{
      
    })    
   }

  isLoadingSubject : Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
  }

}
