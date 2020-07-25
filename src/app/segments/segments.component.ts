import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Segment } from '../models/segment.model';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {
  @Input('titles') titles : string[];
  @Input('startTimes') startTimes : string[];
  @Input('indexSubject') indexObservable : BehaviorSubject<number>;
  @Input('segments') segments : Segment[];
  numbers = [];
  constructor() { 
    
  }

  ngOnInit() {
  }

  passIndex(index : number) {    
    this.indexObservable.next(index);
  }

  fixTitle(str : string) {
    return str.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
}
