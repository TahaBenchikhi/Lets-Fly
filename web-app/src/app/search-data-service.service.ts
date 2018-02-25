import { Injectable } from '@angular/core';
import { SearchData } from './search-container/SearchData';

@Injectable()
export class SearchDataServiceService {
  private url_data;
  private lets_fly_data;
  private other_companies_oneway_data;
  private other_companies_secondway_data;
  constructor() {}

  set_Url_Data(data) {
    this.url_data = data;
  }
  get_Url_Data() {
    return this.url_data;
  }
  set_LetsFly_Data(data) {
    this.lets_fly_data = data;
  }
  get_LetsFly_Data() {
    return this.lets_fly_data;
  }
  set_Other_Companies_Oneway_Data(data) {
    this.other_companies_oneway_data = data;
  }
  get_Other_Companies_Oneway_Data() {
    return this.other_companies_oneway_data;
  }
  set_Other_Companies_Secondway_Data(data) {
    this.other_companies_secondway_data = data;
  }
  get_Other_Companies_Secondway_Data() {
    return this.other_companies_secondway_data;
  }

}
