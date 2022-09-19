import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ConfigResponse,
  GetTimeSheetInterface,
  InsertTimeSheetResPonse,
  TimeSheetResponse,
} from 'src/interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  insertTimeSheet(body: any) {
    const url = this.url + 'postTimeSheet';
    return this.http.post<InsertTimeSheetResPonse>(url, body);
  }

  getConfig() {
    const url = this.url + 'getConfig';
    return this.http.get<ConfigResponse>(url);
  }

  getTimeSheet(body: GetTimeSheetInterface) {
    const url = this.url + `getTimeSheet`;
    return this.http.post<TimeSheetResponse>(url,body);
  }
}
