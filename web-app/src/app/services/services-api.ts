import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { BookInfo } from '../models/BookInfo';
import { TravlerInfo } from '../models/TravlerInfo';

@Injectable()
export class ServicesApi {
  constructor(private http: HttpClient) {
  }

  getFlightsInfo(selectedFlights: any[]) {
    return this.http.post('/getSelectedFlightsInfo',{flights: selectedFlights})
    .map(
        (response:Response) => {
            const data = response;
            return data;
        })
    ;
  }

  createBook(book: BookInfo){
    return this.http.post('/booking',{bookinfo: book})
    .map(
        (response:Response) => {
            const bookid = response;
            return bookid;
        })
    ;

  }

  sendEmail(travler: TravlerInfo) {
    return this.http.post('/sendEmail',{travler: travler})
    .subscribe(
      (response:Response) => {
          return response;
      }, (err) => {
        console.log('service api ERROR.... ');
      });
  ;
  }

/*
  getOtherCompaniesFlights(DataRecieved: any) {
    this.http.get('/getLetsFlyFlights')
    .map(
        (response:Response) => {

        })

  }*/



}
