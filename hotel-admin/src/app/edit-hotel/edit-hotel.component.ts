import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';;

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
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
  selectedImageUrl: any;
  selectedRoomImageUrl:any;
  initialRoomFormValues:any;

  fileInput: any;
  selectedFile: File | any;
  roomDescription: string = '';
  roomType: string = '';
  roomBaseRate: number = 0;
  constructor(private router: Router, private hotelService: HotelService, private route: ActivatedRoute,) {
    this.hotelForm = this.hotelService.createHotelForm();
    this.roomForm = this.hotelService.createRoomForm();
    this.initialRoomFormValues = this.roomForm.value;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['hotelId'];
      this.hotelService.getHotelById(this.hotelId).subscribe(
        (hotelData) => {
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
            View: hotelData.tags.includes('view'),
            'Air Conditioning': hotelData.tags.includes('air conditioning'),
            Pool: hotelData.tags.includes('pool'),
            Bar: hotelData.tags.includes('bar'),
            'Free wifi': hotelData.tags.includes('free wifi'),
            'Free Parking': hotelData.tags.includes('free parking'),
            Restaurant: hotelData.tags.includes('restaurant'),
            'Laundry Service': hotelData.tags.includes('laundry service'),
            'Coffee in lobby': hotelData.tags.includes('coffee in lobby'),
            '24 hour Front desk service': hotelData.tags.includes('24 hour hront desk service'),
            'Continental Breakfast': hotelData.tags.includes('continental breakfast'),
            Concierge: hotelData.tags.includes('concierge'),
          });
          this.hotelFormData = hotelData;
          for (let room of hotelData.rooms) {
            this.allRooms.push(room);
            this.noOfRooms = this.allRooms.length;
          }
          this.selectedImageUrl = hotelData.hotelImage;

        }
      );
    });
  }

  onHotelSubmit() {
    if (this.noOfRooms > 0) {
      if (this.hotelForm.invalid) {
        this.hotelForm.markAllAsTouched();
      }
      else {
        const hotelData = this.hotelForm.value;

        this.address = {
          streetAddress: hotelData.streetAddress,
          city: hotelData.city,
          stateProvince: hotelData.stateProvince,
          postalCode: hotelData.postalCode,
          country: hotelData.country
        };
        hotelData.hotelImage = this.selectedImageUrl;
        hotelData.address = this.address;

        delete hotelData.stateProvince;
        delete hotelData.city;
        delete hotelData.country;
        delete hotelData.streetAddress;
        delete hotelData.postalCode;

        this.tags = [];
        if (hotelData.View) this.tags.push('view');
        if (hotelData['Air Conditioning']) this.tags.push('air conditioning');
        if (hotelData.Pool) this.tags.push('pool');
        if (hotelData.Bar) this.tags.push('bar');
        if (hotelData['Free wifi']) this.tags.push('free wifi');
        if (hotelData['Free Parking']) this.tags.push('free parking');
        if (hotelData.Restaurant) this.tags.push('restaurant');
        if (hotelData['Laundry Service']) this.tags.push('laundry service');
        if (hotelData['Coffee in lobby']) this.tags.push('coffee in lobby');
        if (hotelData['24 hour Front desk service']) this.tags.push('24 hour front desk service');
        if (hotelData['Continental Breakfast']) this.tags.push('continental breakfast');
        if (hotelData.Concierge) this.tags.push('concierge');

        delete hotelData.View;
        delete hotelData['Air Conditioning'];
        delete hotelData.Pool;
        delete hotelData.Bar;
        delete hotelData['Free wifi'];
        delete hotelData['Free Parking'];
        delete hotelData.Restaurant;
        delete hotelData['Laundry Service'];
        delete hotelData['Coffee in lobby'];
        delete hotelData['24 hour Front desk service'];
        delete hotelData['Continental Breakfast'];
        delete hotelData.Concierge;

        hotelData.tags = this.tags;
        hotelData.rooms = this.allRooms;
        const randomHotelId = Math.floor(Math.random() * 1000) + 1;
        hotelData.hotelId = randomHotelId;
        console.log('Hotel Form Data:', hotelData);
        this.hotelService.updateHotel(this.hotelId, hotelData).subscribe(
          (response) => {
            console.log('Hotel added successfully');
          });
          this.router.navigate(['']);
      }
    }
    else {

    }
    
  }

  async onRoomSubmit() {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
    }
    else {
      if (this.isEditRoom) {
        const roomData = this.roomForm.value;
        roomData.roomImage = await this.selectedRoomImageUrl;
        this.allRooms[this.editRoomIndex]=roomData;
        this.isEditRoom = false;
      }
      else {
        const roomData = this.roomForm.value;
        roomData.roomImage = await this.selectedRoomImageUrl;
        this.noOfRooms += 1;
        this.allRooms.push(roomData);
      }
      this.resetHotelForm();
    }
    
  }

  resetHotelForm() {
    this.roomForm.reset(this.initialRoomFormValues);
  }

  editRoom(index: number) {
    this.isEditRoom = true;
    this.editRoomIndex = index;
    this.roomForm.patchValue({
      description: this.allRooms[index].description,
      type: this.allRooms[index].type,
      baseRate: this.allRooms[index].baseRate,
    })

  }

  deleteRoom(index: number) {
    if (index >= 0 && index < this.allRooms.length) {
      this.allRooms.splice(index, 1);
      this.noOfRooms -= 1;
    }

  }

  async selectRoomImage(event: any){
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      const selectedRoomImage = files[0];
      this.selectedRoomImages.push(selectedRoomImage)
      this.fileToImageUrl(selectedRoomImage);
      const response = await this.hotelService.uploadImage(selectedRoomImage);
        this.selectedRoomImageUrl = response;
    if(this.isEditRoom){
      this.allRooms[this.editRoomIndex].roomImage=this.selectedRoomImageUrl;
    }
    }
    
  }
  async onFileChange(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      this.selectedHotelImage = files[0];
      this.fileToImageUrl(this.selectedHotelImage);
      const response = await this.hotelService.uploadImage(this.selectedHotelImage)
        this.selectedImageUrl = response;
    }
  }
  private fileToImageUrl(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImageUrls.push(reader.result as string);
    };
  }

  onCancel(){
    this.router.navigate(['']);
  }
}

