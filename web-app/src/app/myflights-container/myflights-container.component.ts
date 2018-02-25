import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {TravelerService} from "../traveler.service";
import {ServicesApi} from '../services/services-api';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-myflights-container',
  templateUrl: './myflights-container.component.html',
  styleUrls: ['./myflights-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyflightsContainerComponent implements OnInit {

  Client;
  firstFlight;
  roundTrip;
  isRoundTrip: boolean;

  constructor(private traveler: TravelerService,
              private apiservice: ServicesApi,) {
    this.isRoundTrip = traveler.getIsRoundTrip();
    this.Client = {
      title: this.traveler.getInfo().client.title,
      firstname: this.traveler.getInfo().client.firstname,
      lastname: this.traveler.getInfo().client.lastname,
      email: this.traveler.getInfo().client.email,
      phone: this.traveler.getInfo().client.phone,
      passport: this.traveler.getInfo().client.passport_num,
      address: this.traveler.getInfo().client.address + (this.traveler.getInfo().client.address_2 ? ', ' + this.traveler.getInfo().client.address_2 : ''),
      city: this.traveler.getInfo().client.city,
      country: this.traveler.getInfo().client.country
    };
    this.firstFlight = {
      from: this.traveler.getInfo().aller.departure,
      to: this.traveler.getInfo().aller.arrival,
      departure_date: this.traveler.getInfo().aller.departure_date,
      arrival_date: this.traveler.getInfo().aller.arrival_date,
      departure_time: this.traveler.getInfo().aller.departure_time,
      arrival_time: this.traveler.getInfo().aller.arrival_time,
      price: this.traveler.getInfo().aller.price,
    };
    this.roundTrip = {
      from: this.traveler.getInfo().retour.departure,
      to: this.traveler.getInfo().retour.arrival,
      departure_date: this.traveler.getInfo().retour.departure_date,
      arrival_date: this.traveler.getInfo().retour.arrival_date,
      departure_time: this.traveler.getInfo().retour.departure_time,
      arrival_time: this.traveler.getInfo().retour.arrival_time,
      price: this.traveler.getInfo().retour.price,
    };

    console.log(this.Client.email);
  }

  ngOnInit() {
  }

  generatePDF() {
    
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML(document.getElementById('card'), () => {
      pdf.save('web.pdf');
    });

    /*let pdf = new jsPDF('landscape', 'pt', 'a4');

    let specialElementHandlers = {
      '#information': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true
      }
    };
    let margins = {
      top: 10,
      bottom: 60,
      left: 550,
      width: 200
    };*/

    /*var myImage = new Image();
    myImage .src = '../../assets/images/logos/Plane-Logo.png';
    myImage .onload = function(){
      pdf.addImage(myImage, 'PNG', 10, 500, 60, 50);

    };*/

    /*pdf.fromHTML(
      document.getElementById('logo'),
      margins.left,
      margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
      },

      function (dispose) {
        pdf.save('Test.pdf');
      }, margins
    );

    pdf.addFont('HelveticaMS', 'Helvetica', 'normal');
    pdf.setFont('Helvetica');
    pdf.setFontSize(12);
    pdf.text(420, 50, 'Electronic Ticket', 'center');
    pdf.text(420, 70, 'Booking with Let\'s Fly Company', 'center');
    pdf.line(0, 110, 1200, 110);


    pdf.setFontSize(21);
    pdf.text(60, 160, this.firstFlight.from + ' - ' + this.firstFlight.to);
    pdf.text(60, 180, this.firstFlight.departure_date);
    pdf.setFontSize(16);
    pdf.text(60, 210, 'Departure Time: ');
    pdf.text(200, 210, this.firstFlight.departure_time);
    pdf.text(60, 240, 'Arrival Time: ');
    pdf.text(200, 240, this.firstFlight.arrival_time);
    pdf.text(60, 270, 'Price: ');
    pdf.text(200, 270, this.firstFlight.price);

    let y = 270;
    if (this.isRoundTrip) {
      pdf.setFontSize(21);
      pdf.text(60, 300, this.roundTrip.from + ' - ' + this.roundTrip.to);
      pdf.text(60, 320, this.roundTrip.departure_date);
      pdf.setFontSize(16);
      pdf.text(60, 350, 'Departure Time: ');
      pdf.text(200, 350, this.roundTrip.departure_time);
      pdf.text(60, 380, 'Arrival Time: ');
      pdf.text(200, 380, this.roundTrip.arrival_time);
      pdf.text(60, 410, 'Price: ');
      pdf.text(200, 410, this.roundTrip.price);
      y = 410;
    }

    pdf.setFontSize(19);
    pdf.text(60, y + 30, 'Ticket for ');
    pdf.text(60, y + 50, this.Client.title + ' ' + this.Client.firstname + ' ' + this.Client.lastname);
    pdf.setFontSize(16);
    pdf.text(60, y + 70, 'Address:');
    pdf.text(200, y + 70, this.Client.address);
    pdf.text(60, y + 90, 'Email: ');
    pdf.text(200, y + 90, this.Client.email);
    pdf.text(60, y + 110, 'Phone number:');
    pdf.text(200, y + 110, '' + this.Client.phone);
    */

  }
}
