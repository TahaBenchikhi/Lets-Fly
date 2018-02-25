import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchDataServiceService } from '../../search-data-service.service';

@Component({
  selector: 'app-other-companies-result-container',
  templateUrl: './other-companies-result-container.component.html',
  styleUrls: ['./other-companies-result-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OtherCompaniesResultContainerComponent implements OnInit {

  first_way_data;
  second_way_data;
  DataRecieved;
  toggle_flights;

  constructor(private http: HttpClient, private send: SearchDataServiceService) {
    this.first_way_data = [];
    this.second_way_data = [];
    this.toggle_flights = 0;
  }
  ngOnInit() {
    this.DataRecieved = this.send.get_Url_Data();
    this.first_way_data = this.send.get_Other_Companies_Oneway_Data();
    this.second_way_data = this.send.get_Other_Companies_Secondway_Data();

  }
  changepage(element) {
    this.toggle_flights = element;
  }

}
