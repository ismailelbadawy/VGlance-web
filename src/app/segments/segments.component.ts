import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {
  @Input('titles') titles : string[];
  @Input('startTimes') startTimes : string[];
  @Input('indexSubject') indexObservable : BehaviorSubject<number>;
  numbers = [];
  constructor() { 
    
  }

  ngOnInit() {
  }

  passIndex(index : number) {    
    this.indexObservable.next(index);
  }
}
