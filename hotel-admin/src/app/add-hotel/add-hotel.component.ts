import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HotelService } from '../service/hotel.service';
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
  hotelFormData: any = {};
  roomFormData: any = {};
  selectedHotelImage: any;
  selectedRoomImages: File[] = [];
  selectedImageUrls : String[] = [];
  hotelForm: FormGroup;
  roomForm: FormGroup;
  isParkingAvailable: boolean = false;
  selectedAmenities: string[] = [];
  selectedFile: File | any;
  roomDescription: string = '';
  roomType: string = '';
  roomBaseRate: number = 0;
  constructor(private fb: FormBuilder, private hotelService: HotelService) {
    this.hotelForm = this.fb.group({
      hotelName: [''],
      description: [''],
      street: [''],
      city: [''],
      stateProvince: [''],
      country: [''],
      rating: [''],
      selectedImage: [null],
      parkingAvailable: [false],
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
    this.roomForm = this.fb.group({
      roomDescription: [''],
      type: [''],
      baseRate: [''],
    });
  }

  ngOnInit(): void {
  }



  // onFileChanged(event:any) {
  //   this.selectedFile = event.target.files[0]
  // }
  onUpload() {
    const uploadData = new FormData();
    console.log("71", this.selectedFile)
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    console.log("qwqwqwq", uploadData.append('myFile', this.selectedFile, this.selectedFile.name))
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      console.log("uploadData:", uploadData);
    } else {
      console.log("No file selected.");
    }
  }
  onFileChange(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      this.selectedHotelImage = files[0];
      this.fileToImageUrl(this.selectedHotelImage);
    }
  }
  private fileToImageUrl(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImageUrls.push(reader.result as string);
    };
  }

  // onFileChanged(event: any) {
  //   const fileInput = event.target;
  // const file = fileInput.files[0];
  //   if (file) {
  //     this.hotelForm.patchValue({
  //       selectedImage: file,
  //     });
  //     fileInput.value = '';
  //   }
  // }


  onRoomImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded room image:', file);
    }
  }

  // onRoomImageUpload(event: any) {
  //   this.selectedRoomImages = event.target.files;
  //   if (this.selectedRoomImages.length > 0) {
  //     console.log('Uploaded room image:', this.selectedRoomImages[0].name);
  //   }
  // }
  // }
  onHotelSubmit() {
    const hotelData = this.hotelForm.value;
    console.log('Hotel Form Data:', hotelData);
    const selectedImage = hotelData.selectedImage;
    console.log('Hotel Form Data:', hotelData);
    console.log('Selected Image:', selectedImage);
    this.hotelService.addHotel(this.selectedHotelImage);
  }


  onRoomSubmit() {
    const roomData = this.hotelForm.value;
    console.log('Room Form Data:', roomData);
  }

  selectRoomImage(event: any): void {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      const selectedRoomImage = files[0];
      this.selectedRoomImages.push(selectedRoomImage)
      this.fileToImageUrl(selectedRoomImage);
    }
  }

}

