import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDataServiceService } from '../../search-data-service.service';


@Component({
  selector: 'app-one-flight-container',
  templateUrl: './one-flight-container.component.html',
  styleUrls: ['./one-flight-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OneFlightContainerComponent implements OnInit {
  @Input() onedata;
  @Input() is_a_return_flight;
  DataRecieved;
  selected = false;
  @Output() flightSelected = new EventEmitter<any>();
  private cols: number = 12;

  constructor(private http: HttpClient, private send: SearchDataServiceService) {
    this.is_a_return_flight = false;
  }

  ngOnInit() {
    this.DataRecieved = this.send.get_Url_Data();
  }

  bookThisFlight(trip) {
      this.flightSelected.emit(this.onedata.num);
  }

  onResize(event) {
    const element = event.target.innerWidth;
    console.log(element);


    if (element < 950) {
      this.cols = 2;
    }

    if (element > 950) {
      this.cols = 3;
    }

    if (element < 750) {
      this.cols = 1;
    }
  }

}
