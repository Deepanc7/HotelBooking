import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieInteractionService } from './cookieinteraction.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SessionServiceService {
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();
  constructor(private router: Router, private cookieInteractionService : CookieInteractionService) {
    this.userLoggedInSubject.next(this.isAuthenticated());
  }
  startSession(adminDetail: any) {
    this.cookieInteractionService.setCookieItem('currentUser', JSON.stringify(JSON.parse(adminDetail).jwttoken));
    this.userLoggedInSubject.next(true);
    this.router.navigate(['/allHotels']);
  }
  isAuthenticated(): boolean {
    return !!this.getTokenFromCookies();
  }
  endSession() {
    if (this.cookieInteractionService.getCookieItem('currentUser')) {
        this.cookieInteractionService.removeCookieItem('currentUser');
      }
    this.userLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }
  getTokenFromCookies(): string | null {
    const loggedInUserCookie = this.cookieInteractionService.getCookieItem('currentUser');
    if (loggedInUserCookie) {
      const jwttoken = JSON.parse(loggedInUserCookie);
      return jwttoken || null;
    }
    return null;
  }

  setAuthenticated(isAuthenticated: boolean) {
    this.userLoggedInSubject.next(isAuthenticated);
  }
}






