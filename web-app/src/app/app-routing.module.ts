
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SearchContainerComponent} from "./search-container/search-container.component";
import {ResultContainerComponent} from "./result-container/result-container.component";
import {LetsFlyResultContainerComponent} from "./result-container/lets-fly-result-container/lets-fly-result-container.component";
import {OtherCompaniesResultContainerComponent} from "./result-container/other-companies-result-container/other-companies-result-container.component";
import { BookingContainerComponent } from "./booking-container/booking-container.component";
import { WannaCompareContainerComponent } from "./result-container/wanna-compare-container/wanna-compare-container.component";
import {MyflightsContainerComponent} from "./myflights-container/myflights-container.component";
import { GoingbackGuard } from "./goingback.guard";


const routes: Routes = [
  { path: '',  component: SearchContainerComponent},
  {
    path: 'result', canActivate: [GoingbackGuard], component: ResultContainerComponent, children:[
      { path: 'letsfly', canActivate: [GoingbackGuard], component: LetsFlyResultContainerComponent},
      { path: 'otherc', canActivate: [GoingbackGuard], component: OtherCompaniesResultContainerComponent},
      { path: 'compare', canActivate: [GoingbackGuard], component: WannaCompareContainerComponent }
  ]},
  { path: 'booking', canActivate: [GoingbackGuard], component: BookingContainerComponent},
  { path: 'myFlights', canActivate: [GoingbackGuard], component: MyflightsContainerComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{

}
