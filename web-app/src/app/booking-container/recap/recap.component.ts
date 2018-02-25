import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecapComponent implements OnInit {

  @Input() flightInfo;
  @Input() aller;

  constructor() { }

  ngOnInit() {
  }

}
