import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, Signup, LoginResponse } from 'src/interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  login(body: Login) {
    const url = this.url + 'login';
    return this.http.post<LoginResponse>(url, body);
  }

  signup(body: Signup) {
    const url = this.url + 'signup';
    return this.http.post(url, body);
  }
}
