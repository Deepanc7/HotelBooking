import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {

  contacts:String[]=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    // this.contactService.getAllContacts().subscribe(data => {
    //   this.contacts = data;
    // })
  }

  addHotel() {
    this.router.navigate(['/addHotel']);
  }

  editContact(index: number) {
    // const contact = this.contacts[index];
    // this.router.navigate(['/edit-contact/', contact.id], {  state: { contact } });
  }

  deleteContact(index: number) {
    // const contact = this.contacts[index];
    // this.contactService.deleteContact(contact.id).subscribe(data => {
    //   this.getContacts();
    // });
  }

}
