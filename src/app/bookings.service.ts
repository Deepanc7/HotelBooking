import { Injectable } from '@angular/core';
import { Booking } from './booking.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from './login-page/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private userService: LoginServiceService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.userService.getJwtToken()}`
    })
  };

  addBookingDetails(bookingDetails: Booking): Observable<Booking> {
    console.log(bookingDetails);
    return this.http.post<Booking>(`${this.apiUrl}/api/bookings`, bookingDetails);
  }

  getBookingsByEmail(email: String): Observable<Booking[]> {
    const url = `${this.apiUrl}/getBookings/${email}`;
    return this.http.get<Booking[]>(url, this.httpOptions);
  }

  deleteBooking(bookingId: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/delete/${bookingId}`;
    return this.http.delete(url);
  }
}
