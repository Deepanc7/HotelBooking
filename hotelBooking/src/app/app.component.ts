import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent {
  [x: string]: any;
  jsonData: any;
  HotelData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.jsonData = this.dataService.getJsonData().value;
    for (let i = 0; i < this.jsonData.length; i++) {
      this.HotelData.push(this.jsonData[i]);
    }
    localStorage.setItem('hotel_data', JSON.stringify(this.HotelData));
    localStorage.setItem('hotel_details', JSON.stringify(null));
  }
  
  place:string[]=[
    "Mountain View",
    "Atlanta",
    "Chicago",
    "Bangalore",
    "San Antonio",
    "New York",
    "Washington D.C.",
    "Detroit",
    "Seattle",
    "Austin",
    "Mysore"
  ]

}
