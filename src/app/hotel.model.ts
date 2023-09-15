export interface Hotel {
    hotelId: string;
    hotelName: string;
    description: string;
    hotelImage: string;
    tags: string[];
    parkingIncluded: boolean;
    rating: number;
    lowestPrice: number;
    address: address;
    rooms: room[];
  }
  
  export interface address {
    streetAddress: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  }
  
  export interface room {
    description: string;
    type: string;
    baseRate: number;
    roomImage: string;
  }
  