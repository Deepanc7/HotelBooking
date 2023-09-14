export interface Booking {
    id: string|undefined,
    hotelName: String,
    hotelImage: String,
    checkIn: Date,
    checkOut: Date,
    room: Number,
    guests: Number,
    totalPrice: Number,
    userEmail: String
}