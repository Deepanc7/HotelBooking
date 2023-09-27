import { Injectable } from '@angular/core';
import { User } from '../user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }
  


  getUserByEmail(email: String): Observable<User> {
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

    return this.http.post(`${this.apiUrl}/login`, loginData);

  }

  logout(): Observable<any> {
    const jwtToken = this.getJwtToken();
    if (!jwtToken) {
      throw new Error('JWT token is missing.');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    this.router.navigate(['/login']);
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('session');
  }

  getJwtToken(): string {
    return this.cookieService.get('session');
  }

  getUser(): Observable<User> {
    const jwtToken = this.getJwtToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      })
    };
    return this.http.get<User>(`${this.apiUrl}/getUser`, httpOptions);
  }

  getUserName() {
    return localStorage.getItem("UserName")||'';
  }

  setUserName(userName: string) {
    localStorage.setItem("UserName",userName);
  }

  setCookie(jwt: string) {
    this.cookieService.set("session", jwt);
  }

  clearCookie() {
    this.cookieService.deleteAll();
  }

}
