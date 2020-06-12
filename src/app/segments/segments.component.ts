import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {
  @Input('titles') titles : string[];
  constructor() { }

  ngOnInit() {
  }

}
