import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDataServiceService } from '../../search-data-service.service';

@Component({
  selector: 'app-wanna-compare-container',
  templateUrl: './wanna-compare-container.component.html',
  styleUrls: ['./wanna-compare-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WannaCompareContainerComponent implements OnInit {
  first_way_data;
  second_way_data;
  toggle_flights;
  selected_letsfly_flights;
  is_return;
  constructor(private http: HttpClient, private send: SearchDataServiceService) {
    this.first_way_data = [];
    this.second_way_data = [];
    this.toggle_flights = 0;
    this.selected_letsfly_flights = [];
    this.is_return = false;
  }

  ngOnInit() {

    this.send.get_Other_Companies_Oneway_Data().forEach((element, index) => {
      this.first_way_data.push(element);
    });
    this.send.get_LetsFly_Data().aller.forEach((element, index) => {
      this.first_way_data.push(element);
    });
    this.sort(this.first_way_data);
    if (this.send.get_Other_Companies_Secondway_Data()) {
      this.send.get_Other_Companies_Secondway_Data().forEach((element, index) => {
        this.second_way_data.push(element);
      });
      this.send.get_LetsFly_Data().retour.forEach((element, index) => {
        this.second_way_data.push(element);
      });
      this.sort(this.second_way_data);

    }
    else { this.is_return = true; }
  }


  changepage(element) {
    this.toggle_flights = element;
  }
  get_letsfly_flight($event) {
    if (this.toggle_flights == 0 && !this.is_return) {
      this.selected_letsfly_flights.push($event);
      this.toggle_flights = 1;
    }
    else if (this.toggle_flights == 1 || this.is_return) {
      this.selected_letsfly_flights.push($event);
      console.log(this.selected_letsfly_flights);
      alert('Done');
    }

  }


  private sort(text) {
    text.sort(function (a, b) {
      const a_price = a.price.match(/\d+$/)[0];
      const b_price = b.price.match(/\d+$/)[0];
      // tslint:disable-next-line:radix
      return parseInt(a_price) > parseInt(b_price);
    });
  }

}

