import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SearchData} from '../../search-container/SearchData';
import {SearchDataServiceService} from '../../search-data-service.service';


@Component({
  selector: 'app-lets-fly-result-container',
  templateUrl: './lets-fly-result-container.component.html',
  styleUrls: ['./lets-fly-result-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LetsFlyResultContainerComponent implements OnInit {
  data;
  DataRecieved;
  toggleFlights = true;
  selectedFlights = [];

  constructor(private http: HttpClient, private send: SearchDataServiceService,
              private router: Router) {
    this.data = [];
  }

  ngOnInit() {
    this.DataRecieved = this.send.get_Url_Data();
    this.data = this.send.get_LetsFly_Data();
    console.log(this.data);
  }

  toggleit($event: Event) {
    this.selectedFlights.push($event);
    this.toggleFlights = !this.toggleFlights;
    if(this.selectedFlights.length === 2 || !this.data.retour || this.data.retour.length === 0) {
      this.router.navigate(['/booking'],{ queryParams: { flightA: this.selectedFlights[0], flightR: this.selectedFlights[1] }})
    }
  }
}
