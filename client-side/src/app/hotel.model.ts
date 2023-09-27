

export interface Hotel {
  id: string;
  hotelId: string;
  hotelName: string;
  description: string;
  hotelImage: string;
  tags: any[];
  parkingIncluded: boolean;
  rating: number;
  address: Address;
  rooms: Room[];
  lowestPrice: number;
}

export interface Address {
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

export interface Room {
  description: string;
  type: string;
  baseRate: number;
  roomImage: string;
}
