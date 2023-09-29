import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
@Injectable({
    providedIn: 'root',
})
export class HotelService {
    constructor(private httpService: HttpService) { }
    async addHotel(data: File) {
        try {
            const formData = new FormData();
            formData.append('file', data);

            const response = await this.httpService.multiPartPostData('/hotels/addHotel', formData).toPromise();
        } catch (error) {
            console.log(error);
        }
    }
}
