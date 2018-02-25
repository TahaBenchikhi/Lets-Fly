import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
private _token = false;
  constructor() { }
  setToken(token)
  {
    this._token = token;
  }
  getToken()
  {
    return this._token;
  }

}
