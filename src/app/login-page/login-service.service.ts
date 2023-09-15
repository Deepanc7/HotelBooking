import { Injectable } from '@angular/core';
import { User } from '../user.interface';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}


  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/by-email/${email}`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true });

  }

  
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('session_id');
  }

  setAuthToken(token: string) {
    this.cookieService.set('session_id', token);
  }

  getAuthToken(): string {
    return this.cookieService.get('session_id');
  }

  
  setEmailToken(email:string){
    this.cookieService.set('email', email);
  }

  getEmailToken(): string {
    return this.cookieService.get('email');
  }
  
  clearEmailToken() {
    this.cookieService.delete('email');
  }
  

}
