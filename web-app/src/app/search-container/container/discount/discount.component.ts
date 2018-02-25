import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import {TokenService} from "../../../token.service";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DiscountComponent implements OnInit {

  constructor(private router: Router, private token: TokenService) { }

  ngOnInit() {
  }

  offreNoel(city: string) {
    let departure = 'BOD';
    let departure_name = "BOD,France,Bordeaux - Merignac Airport";

    this.token.setToken(true);
    switch(city) {
      case "Moscow":
        this.router.navigate(['result',
          {
            from: departure,
            allfrom: departure_name,
            to: "BKA",
            allto: "BKA,Russia,Moscow - Bykovo Airport",
            departuredate: "2017-12-30",
            backdate: "0000-00-00",
            adults: 1,
            childrens: 0
          }]);
        break;
      case "Casablanca":
        this.router.navigate(['result',
          {
            from: departure,
            allfrom: departure_name,
            to: "CMN",
            allto: "CMN,Morocco,Casablanca - Mohammed V International Airport",
            departuredate: "2017-12-30",
            backdate: "0000-00-00",
            adults: 1,
            childrens: 0
          }]);
        break;
      case "Venise":
        this.router.navigate(['result',
          {
            from: departure,
            allfrom: departure_name,
            to: "VCE",
            allto: "VCE,Italy,Venice - Marco Polo International Airport",
            departuredate: "2017-12-30",
            backdate: "0000-00-00",
            adults: 1,
            childrens: 0
          }]);
        break;
      case "Madrid":
        window.open("https://www.google.com/flights/#search;f=BOD;t=MAD,XOC,XTI;d=2017-12-30;r=2018-01-05;tt=o", "_blank");
        break;
      case "Londres":
        window.open("https://www.google.com/flights/#search;f=BOD;t=LHR,LGW,STN,LTN,LCY,SEN,QQS;d=2017-12-30;r=2018-01-05;tt=o", "_blank");
        break;
      case "Rabat":
        window.open("https://www.google.com/flights/#search;f=BOD;t=RBA;d=2017-12-30;r=2018-01-05;tt=o", "_blank");
        break;
    }
  }
}
