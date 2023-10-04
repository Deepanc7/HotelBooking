import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit {

  hotelFormData: any = {};
  roomFormData: any = {};
  selectedHotelImage: any;
  selectedRoomImages: File[] = [];
  hotelForm: FormGroup;
  roomForm: FormGroup;
  isparkingIncluded: boolean = false;
  tags: string[] = [];
  allRooms: any[] = [];
  noOfRooms: number = 0;
  selectedImageUrls: String[] = [];
  address: any;
  hotelId: any;
  isEditRoom: boolean = false;
  editRoomIndex: number = 0;

  fileInput: any;
  selectedFile: File | any;
  roomDescription: string = '';
  roomType: string = '';
  roomBaseRate: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private hotelService: HotelService, private route: ActivatedRoute,private dialogRef: MatDialogRef<ViewHotelComponent>) {
    this.hotelForm = this.hotelService.createHotelForm();
    this.roomForm = this.hotelService.createRoomForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['hotelId'];
      this.hotelService.getHotelById(this.data).subscribe(
        (hotelData) => {
          console.log("69", hotelData);
          this.hotelForm.patchValue({
            hotelName: hotelData.hotelName,
            description: hotelData.description,
            streetAddress: hotelData.address.streetAddress,
            city: hotelData.address.city,
            stateProvince: hotelData.address.stateProvince,
            country: hotelData.address.country,
            rating: hotelData.rating,
            postalCode: hotelData.address.postalCode,
            hotelImage: hotelData.hotelImage,
            parkingIncluded: hotelData.parkingIncluded,
            tags: hotelData.tags,
          });
          this.hotelFormData = hotelData;
          console.log("99", this.hotelFormData)

          for (let room of hotelData.rooms) {
            this.allRooms.push(room);
            this.noOfRooms = this.allRooms.length;
          }

        }
      );
    });
  }
  capitalizeFirstLetter(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onClose(): void {
    this.dialogRef.close();
}

}