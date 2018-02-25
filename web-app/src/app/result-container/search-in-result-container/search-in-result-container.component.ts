import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SearchData } from '../../search-container/SearchData';
import { SearchDataServiceService } from '../../search-data-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-in-result-container',
  templateUrl: './search-in-result-container.component.html',
  styleUrls: ['./search-in-result-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchInResultContainerComponent implements OnInit {
  data;
  constructor(private http: HttpClient, private send: SearchDataServiceService) {
  }

  ngOnInit() {
    this.data = this.send.get_Url_Data();
  }

}
