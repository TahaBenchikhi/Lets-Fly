import { Injectable } from '@angular/core';
import {TravlerInfo} from "./models/TravlerInfo";

@Injectable()
export class TravelerService {

  travler: TravlerInfo;
  isRoundTrip;

  constructor() {
    this.isRoundTrip = false;
    this.travler = new TravlerInfo();
  }

  public setResId_aller(id: any) {
    this.travler.bookid_aller = id;
  }

  public setResId_retour(id: any) {
    this.travler.bookid_retour= id;
  }

  public getInfo(){
    return this.travler;
  }

  public setFirstInfo(aller:any){
    this.travler.aller = aller;
  }

  public setBackInfo(retour:any){
    this.travler.retour = retour;
  }

  public setClientInfo(client:any){
    this.travler.client = client;
  }

  public setIsRoundTrip(val:boolean ){
    this.isRoundTrip = val;
  }

  public getIsRoundTrip(){
    return this.isRoundTrip;
  }

}
