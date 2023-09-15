import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';
import { LoginServiceService } from './login-page/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, LoginServiceService]
})
export class AppComponent {
  jsonData: any;
  HotelData: any[]=[];
  LowestRoomPrice: number[] = [];

  constructor(private dataService: DataService,private dialog: MatDialog, private userService: LoginServiceService, private router: Router) {
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


  goToBookings() {
    if(this.isUserLoggedIn()) {
      this.router.navigate(['/bookingDetails']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  isUserLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }

  getUserName(): string | null {
    return this.userService.getAuthToken();
  }

  openLogoutPopup(): void {
    const dialogRef = this.dialog.open(LogoutComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.clearEmailToken();
      }
    });
  }

}
