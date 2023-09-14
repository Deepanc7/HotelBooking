

export interface Hotel {
    id: string;
    HotelId: string;
    HotelName: string;
    Description: string;
    HotelImage: string;
    Tags: string[];
    ParkingIncluded: boolean;
    Rating: number;
    Address: Address;
    Rooms: Room[];
  }
  
  export interface Address {
    StreetAddress: string;
    City: string;
    StateProvince: string;
    PostalCode: string;
    Country: string;
  }
  
  export interface Room {
    Description: string;
    Type: string;
    BaseRate: number;
    RoomImage: string;
  }
  