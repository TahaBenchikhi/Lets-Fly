import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PlatformLocation } from '@angular/common';
import { TokenService } from './token.service';
@Injectable()
export class GoingbackGuard implements CanActivate {
  redirect = true;
  constructor(private router: Router, private _location: PlatformLocation, private token: TokenService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._location.onPopState(() => {
      location.reload();
      this.redirect = false;
    });
    if (!this.token.getToken()) { this.router.navigate(['/']);}
    return this.redirect;
  }
}
