import {Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServicesApi } from '../services/services-api';
import { BookInfo } from '../models/BookInfo';
import {MaterializeAction} from "angular2-materialize";
import {TravelerService} from "../traveler.service";

@Component({
  selector: 'app-booking-container',
  templateUrl: './booking-container.component.html',
  styleUrls: ['./booking-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingContainerComponent implements OnInit {
  datePicker = new EventEmitter<string|MaterializeAction>();

  message = '';
  isError = false;

  flightA: any;
  flightR: any;

  flightsInfo = [];

  book_aller : BookInfo;
  book_retour : BookInfo;

  bookid_aller: String;
  bookid_retour: String;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private apiservice: ServicesApi,
              private traveler: TravelerService) {

              }

  ngOnInit() {
    /* Get flights from api with num vols */
    this.activeRoute.queryParams.subscribe( params => {
      if(params['flightA']){
        this.flightA = params['flightA'];
        this.book_aller = new BookInfo(this.flightA);
      }
      if(params['flightR']){
        this.flightR = params['flightR'];
        this.book_retour = new BookInfo(this.flightR);
      }
    });

    this.apiservice.getFlightsInfo([this.flightA, this.flightR]).subscribe(
      (flights: any) => {
        this.flightsInfo = flights;
      },
      (error : Error) => console.log(error)
    );
  }

  onBooking() {
    this.traveler.setClientInfo(this.book_aller);
    this.traveler.setFirstInfo(this.flightsInfo[0]);
    this.apiservice.createBook(this.book_aller)
    .subscribe((bookinfo) => {
      this.traveler.setResId_aller(bookinfo['bookid']);
      this.showSuccess('Book added! You can check your email for more information');

        /* set retour */
        if(this.book_retour){
          this.book_retour = this.book_aller;
          this.traveler.setClientInfo(this.book_retour);
          this.traveler.setBackInfo(this.flightsInfo[1]);
          this.traveler.setIsRoundTrip(true);
          this.book_retour.numVol = this.flightR;

          this.apiservice.createBook(this.book_retour)
          .subscribe((bookinfo) => {
            console.log('am hereee '+ bookinfo['bookid']);
            this.traveler.setResId_retour(bookinfo['bookid']);
            this.showSuccess('Book added! You can check your email for more information');

            /* if everything set, send mail */
              if(!this.isError){
                console.log(this.traveler.getInfo());
                this.apiservice.sendEmail(this.traveler.travler);
                this.router.navigate(['/myFlights'])
              }

        }, (err) => {
          this.showError('Error while booking your flight');
          console.error(err);
        });
      }

    }, (err) => {
      this.showError('Error while booking your flight');
      console.error(err);
    });

  }


  private showError(message: string): void {
    this.message = message;
    this.isError = true;
    window.scrollTo(0, 0);
  }

  private showSuccess(message: string): void {
    this.message = message;
    this.isError = false;
    window.scrollTo(0, 0);
  }

}
