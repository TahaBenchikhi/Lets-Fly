import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchData } from '../search-container/SearchData';
import { HttpClient } from '@angular/common/http';
import { SearchDataServiceService } from '../search-data-service.service';

@Component({
  selector: 'app-result-container',
  templateUrl: './result-container.component.html',
  styleUrls: ['./result-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultContainerComponent implements OnInit {

  params_temp;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,
    private router: Router, private send: SearchDataServiceService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      /* Redirect if there is no search params */
      if (Object.keys(params).length === 0 && !this.send.get_Url_Data()) { this.router.navigate(['/']); }
      this.params_temp = params;
    });
    this.send.set_Url_Data(this.params_temp);
    this.http.post('/getLetsFlyFlights',
      {
        departure_date: this.send.get_Url_Data().departuredate,
        back_date: this.send.get_Url_Data().backdate,
        depart: this.send.get_Url_Data().from,
        destination: this.send.get_Url_Data().to,
        personnes: Number(this.send.get_Url_Data().adults) + Number(this.send.get_Url_Data().childrens)
      }).subscribe(response => {
        if (response) {
          let temp_data;
          temp_data = response;
          /* Adding Duration */
          temp_data.aller.forEach((element, index) => {
            const departure_time = +new Date("2017-05-02T" + element.departure_time);
            const arrival_time = +new Date("2017-05-02T" + element.arrival_time);
            temp_data.aller[index].duration = Math.floor(((arrival_time - departure_time) / 1000) / 60) + 'min';
          });
          if (temp_data.retour) {
            temp_data.retour.forEach((element, index) => {
              const departure_time = +new Date("2017-05-02T" + element.departure_time);
              const arrival_time = +new Date('2017-05-02T' + element.arrival_time);
              temp_data.retour[index].duration = Math.floor(((arrival_time - departure_time) / 1000) / 60) + 'min';
            });
          }
          this.send.set_LetsFly_Data(temp_data);

          this.http.post('/getOtherCompaniesFlights',
            {
              date: this.send.get_Url_Data().departuredate,
              depart: this.send.get_Url_Data().from,
              destination: this.send.get_Url_Data().to,
              adults: this.send.get_Url_Data().adults,
              childrens: this.send.get_Url_Data().childrens
            }).subscribe(response => {
              console.log(response);
              if (response) {
                let temp_data;
                temp_data = response;
                temp_data.forEach((element, index) => {
                  // tslint:disable-next-line:max-line-length
                  element.departure_time = response[index].departureTime.slice(response[index].departureTime.indexOf('T') + 1, response[index].departureTime.indexOf('+'));
                  // tslint:disable-next-line:max-line-length
                  element.arrival_time = response[index].arrivalTime.slice(response[index].arrivalTime.indexOf('T') + 1, response[index].arrivalTime.indexOf('+'));
                  element.duration = response[index].duration + 'min';
                  element.price = response[index].totalprice;
                  element.image = response[index].image;
                  // tslint:disable-next-line:max-line-length
                  element.link = 'https://www.google.fr/flights/beta#flt=' + element.origin + '.' + element.destination + '.' + this.send.get_Url_Data().departuredate + '.' + element.origin + element.destination + '0' + element.flightcarrier + element.flightnumber + ';e:1;s:0;sd:1;t:f;tt:o';
                });
                this.send.set_Other_Companies_Oneway_Data(temp_data);
                if (this.send.get_Url_Data().backdate.toString() !== '0000-00-00') {
                  this.http.post('/getOtherCompaniesFlights',
                    {
                      date: this.send.get_Url_Data().backdate,
                      depart: this.send.get_Url_Data().to,
                      destination: this.send.get_Url_Data().from,
                      adults: this.send.get_Url_Data().adults,
                      childrens: this.send.get_Url_Data().childrens
                    }).subscribe(response => {
                      if (response) {
                        let temp_data;
                        temp_data = response;
                        temp_data.forEach((element, index) => {
                          // tslint:disable-next-line:max-line-length
                          element.departure_time = response[index].departureTime.slice(response[index].departureTime.indexOf('T') + 1, response[index].departureTime.indexOf('+'));
                          // tslint:disable-next-line:max-line-length
                          element.arrival_time = response[index].arrivalTime.slice(response[index].arrivalTime.indexOf('T') + 1, response[index].arrivalTime.indexOf('+'));
                          element.duration = response[index].duration + 'min';
                          element.price = response[index].totalprice;
                          element.image = response[index].image;
                          // tslint:disable-next-line:max-line-length
                          element.link = 'https://www.google.fr/flights/beta#flt=' + element.origin + '.' + element.destination + '.' + this.send.get_Url_Data().backdate + '.' + element.origin + element.destination + '0' + element.flightcarrier + element.flightnumber + ';e:1;s:0;sd:1;t:f;tt:o';
                        });
                        this.send.set_Other_Companies_Secondway_Data(temp_data);
                      } else {
                        this.send.set_Other_Companies_Secondway_Data([]);
                      }
                    });
                }
                this.router.navigate(['result/letsfly']);
              } else {
                this.send.set_Other_Companies_Oneway_Data([]);
              }

            });

        } else {
          this.send.set_LetsFly_Data([]);
        }
      });


  }

}
