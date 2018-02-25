import {Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SearchData} from '../../SearchData';
import {MaterializeAction} from "angular2-materialize";
import {TravelerService} from "../../../traveler.service";
import { TokenService } from '../../../token.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  Data;
  Tosend: SearchData;
  FData: Array<any> = [];
  WData: Array<any> = [];
  Selected: Boolean;
  roundtrip: Boolean;
  errors = false;
  cols: any = 3;
  showInput: boolean;
  reservationID;
  data;
  noFlightFound: boolean;
  findclicked: boolean;

  birthDateActions = new EventEmitter<string | MaterializeAction>();

  constructor(private http: HttpClient, private router: Router, private traveler: TravelerService, private token: TokenService) {
    this.Data = [];
    this.Tosend = new SearchData();
    this.Selected = false;
    this.noFlightFound = false;
    this.findclicked = false;
    this.roundtrip = false;
  }

  ngOnInit() {
    const LocalData = JSON.parse(localStorage.getItem('aeoports'));
    if (!LocalData) {
      this.http.post('/airports', {}).subscribe(response => {
        if (response) {
          localStorage.setItem('aeoports', JSON.stringify(response));
          this.Data = response;
          console.log("data received");
        } else this.Data = [];
      });
    }
    else this.Data = LocalData;
  }

  private toggleInput() {
    this.showInput = !this.showInput;
  }

  private findFlight() {
    this.token.setToken(true);
    this.noFlightFound = false;
    this.http.post('/myflights', {
      reservationID: this.reservationID
    }).subscribe(response => {
        let travelerInfo = response[0];
        let flightInfo = response[1];
        this.traveler.setFirstInfo(travelerInfo);
        this.traveler.setClientInfo(flightInfo);
        this.token.setToken(true);
        this.router.navigate(['myFlights'], {queryParams: {travel: this.data}});
      }, () => {
        this.noFlightFound = true;
      }
    );
  }

  OnkeyFrom(event: any) {
    this.Selected = false;
    const search = event.target.value.toLowerCase();
    let cnt = 0;
    this.FData = [];
    if (search) {
      for (const entry of this.Data) {
        // tslint:disable-next-line:curly
        if ((entry.AiroportName.toLowerCase().indexOf(search) >= 0
            || entry.Country.toLowerCase().indexOf(search) >= 0
            || entry.IATA.toLowerCase().indexOf(search) >= 0) && entry.AiroportName.toLowerCase().indexOf('airport') >= 0) {
          this.FData.push(entry);
          cnt++;
        }
        // tslint:disable-next-line:one-line
      }
      // tslint:disable-next-line:curly
      if (cnt === 0) this.FData = [{
        AiroportName: 'No Aeroport found',
        Country: 'No Country found',
        IATA: 'No IATA found'
      }];
    }
  }

  OnkeyWhere(event: any) {
    this.Selected = false;
    const search = event.target.value.toLowerCase();
    let cnt = 0;
    this.WData = [];
    if (search && this.Data.length > 0) {
      for (const entry of this.Data) {
        // tslint:disable-next-line:curly
        if ((entry.AiroportName.toLowerCase().indexOf(search) >= 0
            || entry.Country.toLowerCase().indexOf(search) >= 0
            || entry.IATA.toLowerCase().indexOf(search) >= 0) && entry.AiroportName.toLowerCase().indexOf('airport') >= 0) {
          this.WData.push(entry);
          cnt++;

        }
        // tslint:disable-next-line:one-line
      }
      // tslint:disable-next-line:curly
      if (cnt === 0) this.WData = [{
        AiroportName: 'No Aeroport found',
        Country: 'No Country found',
        IATA: 'No IATA found'
      }];
    }

  }

  toggleRoundTrip() {
    if (this.cols === 4)
      this.cols--;
    else this.cols++;
  }

  SendData() {
    if (this.Selected && !this.roundtrip) {
      this.token.setToken(true);
      this.router.navigate(['result',
        {
          from: this.Tosend.from.slice(0, this.Tosend.from.indexOf(',')),
          allfrom: this.Tosend.from,
          to: this.Tosend.to.slice(0, this.Tosend.to.indexOf(',')),
          allto: this.Tosend.to,
          departuredate: this.Tosend.departuredate,
          backdate: this.Tosend.backdate,
          adults: 1,
          childrens: 3

        }]);
    }
    // tslint:disable-next-line:one-line
    else {
      this.errors = true;
    }
  }

  onFindClick() {
    this.findclicked = !this.findclicked;
  }
}
