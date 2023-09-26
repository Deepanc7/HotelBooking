# InnSight - Hotel Booking Website
## Features: 
- Search using location, city, country, pincode and hotel name. (free index search)
- Filters - price range, tags, rating, parking.
- Sort by - low to high, high to low, popularity.
- Popular hotels in home page
- Popular destinations
- Sign up, login and logout ( JWT and cookies)
- View Hotel details weather in that city and select hotel rooms
- View price and total estimation based on choices
- Book hotel, view booking details, and cancel booking

## Third party library:
- ngx toastr
- weather api

## Steps to run mongodb server side:
```
Open server-side -> src/main/java -> com.example.HotelBookingInnsight -> HotelBookingInnsightApplication.java
Right click-> Run As -> Java Application

Note- Currently the database is present in our cluster. If you need to connect to your MongoDB server then change the credentials in the application.properties file.

Follow the following steps:

Create a database with name hotel-management
Insert the json files ( Data is in MongoDB Data.json)
Create collections with name as user, hotels, bookings.
```
### Steps to run mysql server side:
```
Open server-side -> src/main/java -> com.example.hotelbookingappSQL -> HotelBookingSQLApplication.java
Right click in the file -> Run As -> Java Application

create database in mysql called hotel-management
add hotel data using postman post request  
http://localhost:8080/addHotels

data is present in SQL Data.txt
```

### Steps to run Project integrated with MySQL and MongoDB:
```
Open server-side -> src/main/java -> com.example.HotelBookingFinal -> HotelBookingFinalApplication.java
Right click in the file -> Run As -> Java Application

Make changes in HotelBookingFinalApplication.java based on the database
ComponentScan is should be commented for the other database.
```
