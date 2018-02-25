import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SearchContainerComponent } from './search-container/search-container.component';
import {SearchComponent} from "./search-container/container/search/search.component";
import {ContainerComponent} from "./search-container/container/container.component";
import { ResultContainerComponent } from './result-container/result-container.component';
import {AppRoutingModule} from "./app-routing.module";
import { BookingContainerComponent } from './booking-container/booking-container.component';
import { RecapComponent } from './booking-container/recap/recap.component';
import { LetsFlyResultContainerComponent } from './result-container/lets-fly-result-container/lets-fly-result-container.component';
import { OtherCompaniesResultContainerComponent } from './result-container/other-companies-result-container/other-companies-result-container.component';
import { SearchInResultContainerComponent } from './result-container/search-in-result-container/search-in-result-container.component';
import { OneFlightContainerComponent } from './result-container/one-flight-container/one-flight-container.component';
import { ResultTabsContainerComponent } from './result-container/result-tabs-container/result-tabs-container.component';
import { SearchDataServiceService } from './search-data-service.service';
import { WannaCompareContainerComponent } from './result-container/wanna-compare-container/wanna-compare-container.component';
import { MyflightsContainerComponent } from './myflights-container/myflights-container.component';
import { ServicesApi } from './services/services-api';
import { TravelerService } from "./traveler.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterializeModule} from "angular2-materialize";
import { GoingbackGuard } from './goingback.guard';
import { TokenService } from './token.service';
import { DiscountComponent } from './search-container/container/discount/discount.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    ContainerComponent,
    SearchContainerComponent,
    ResultContainerComponent,
    BookingContainerComponent,
    RecapComponent,
    LetsFlyResultContainerComponent,
    OtherCompaniesResultContainerComponent,
    SearchInResultContainerComponent,
    OneFlightContainerComponent,
    ResultTabsContainerComponent,
    WannaCompareContainerComponent,
    MyflightsContainerComponent,
    DiscountComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterializeModule
  ],
  providers: [SearchDataServiceService, ServicesApi, TravelerService, GoingbackGuard, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
