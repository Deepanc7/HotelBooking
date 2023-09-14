import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent {
  jsonData: any;
  HotelData: any[]=[];
  LowestRoomPrice: number[] = [];

  constructor(private dataService: DataService,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.jsonData = this.dataService.getJsonData();
    for (let i = 0; i < this.jsonData.length; i++) {
      this.HotelData.push(this.jsonData[i]);
    }
    this.lowestRoomPrice();
    this.dataService.setHotelData(this.HotelData);
  }

  lowestRoomPrice() {
    for (let i = 0; i < this.HotelData.length; i++) {
      let lowestPrice = Number.MAX_SAFE_INTEGER;
      for (const room of this.HotelData[i].Rooms) {
        if (room.BaseRate < lowestPrice) {
          lowestPrice = room.BaseRate;
        }
      }
      this.LowestRoomPrice.push(lowestPrice);
      this.HotelData[i].LowestPrice = lowestPrice;
    }
  }


  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('userName') !== null;
  }

  getUserName(): string | null {
    return sessionStorage.getItem('userName');
  }

 

  openLogoutPopup(): void {
    const dialogRef = this.dialog.open(LogoutComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        sessionStorage.removeItem('userName');
      }
    });
  }

}
