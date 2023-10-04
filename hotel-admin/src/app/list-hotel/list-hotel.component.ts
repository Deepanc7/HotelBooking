import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewHotelComponent } from '../view-hotel/view-hotel.component';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {
  hotels: any[] = [];

  constructor(private router: Router, private hotelService: HotelService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotels = hotels;
      console.log("18",this.hotels);
    });
  }

  addHotel():void {
    this.router.navigate(['/addHotel']);
  }

  viewHotel(hotel: any): void {
    const dialogRef = this.dialog.open(ViewHotelComponent, {
      width: '1300px',
      data: hotel.id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  editHotel(hotel: any): void {
    this.router.navigate(['/editHotel', hotel.id]);
  }

  deleteHotel(hotel: any): void {
    const hotelId = hotel.id;
    this.hotelService.deleteHotel(hotelId).subscribe({
      next: () => { 
        const index = this.hotels.findIndex((h) => h.id === hotelId);
        if (index !== -1) {
          this.hotels.splice(index, 1);
        }
      },
      error: (error) => { 
      }
    });
  }


}
