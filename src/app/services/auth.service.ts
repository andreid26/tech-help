import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '@enums/endpoints.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  
  register(payload): Observable<any> {
    return this._http.post(Endpoints.REGISTER_URL, payload, { responseType: 'text' });
  }

  login(payload): Observable<any> {
    return this._http.post(Endpoints.LOGIN_URL, payload);
  }

  getCurrentUser(): Observable<any> {
    return this._http.get(Endpoints.CURRENT_USER_URL);
  }
}