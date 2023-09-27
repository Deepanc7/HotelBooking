export interface Booking {
    id: string|undefined,
    hotelId: String,
    checkIn: Date,
    checkOut: Date,
    room: Number,
    guests: Number,
    totalPrice: Number,
    userId: String | undefined;
}