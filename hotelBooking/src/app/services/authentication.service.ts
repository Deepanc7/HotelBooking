import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  apiurl = 'http://localhost:3000/user';

  RegisterUser(inputData: any) {
    return this.httpClient.post(this.apiurl, inputData);
  }

  GetUserByCode(id: any) {
    return this.httpClient.get(this.apiurl + '/' + id);
  }
}
