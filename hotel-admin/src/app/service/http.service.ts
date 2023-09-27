import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }
  mainUrl = 'http://localhost:8080';
  postData(url: string, data: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(this.mainUrl + url, data, { headers: headers, responseType: 'text' });
  }
  
}
