import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({
    providedIn: 'root',
})
export class HotelService {

    private baseUrl = 'http://localhost:8080';
    
    constructor(private httpService: HttpService, private http: HttpClient, private fb: FormBuilder) { }

    createHotelForm(): FormGroup {
        return this.fb.group({
          hotelName: ['', Validators.required],
          description: ['', Validators.required],
          streetAddress: ['', Validators.required],
          city: ['', Validators.required],
          stateProvince: ['', Validators.required],
          country: ['', Validators.required],
          rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
          postalCode: ['', Validators.required],
          hotelImage: [null],
          parkingIncluded: [false],
          View: [false],
          'Air Conditioning': [false],
          Pool: [false],
          Bar: [false],
          'Free wifi': [false],
          'Free Parking': [false],
          Restaurant: [false],
          'Laundry Service': [false],
          'Coffee in lobby': [false],
          '24 hour Front desk service': [false],
          'Continental Breakfast': [false],
          Concierge: [false],
        });
      }
    
      createRoomForm(): FormGroup {
        return this.fb.group({
          description: ['', Validators.required],
          type: ['', Validators.required],
          baseRate: ['', [Validators.required, Validators.min(0)]],
          roomImage: [null],
        });
      }
    
      addHotel(hotelData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/addhotel`, hotelData);
      }
    
      getAllHotels(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getAllHotel`);
      }
      deleteHotel(hotelId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/hotels/${hotelId}`);
      }
    
      getHotelById(hotelId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/hotels/${hotelId}`);
      }
    
      updateHotel(hotelId: string, updatedData: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/hotels/${hotelId}`, updatedData);
      }
      postData(url: string, data: object): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        return this.http
          .post(this.baseUrl + url, data, { headers: headers, responseType: 'text' });
      }
      multiPartPostData(url: string, data: object): Observable<any> {
        return this.http
          .post(this.baseUrl + url, data, { responseType: 'text' });
      }
      async uploadImage(data: File): Promise<void> {
        try {
          const formData = new FormData();
          formData.append('file', data);
    
          return await firstValueFrom(
            this.multiPartPostData('/hotels/addHotel', formData).pipe(
              catchError((error) => {
                console.error(error);
                throw error; 
              })
            )
          );
        } catch (error) {
          console.log(error);
        }
      }
}
