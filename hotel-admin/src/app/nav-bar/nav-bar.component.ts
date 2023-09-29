import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../service/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLoggedIn: boolean = false;


  constructor(private sessionService: SessionServiceService) {}

  ngOnInit() {
    this.sessionService.userLoggedIn$.subscribe((loggedIn)=>{
      this.userLoggedIn = loggedIn;
    })
  }
  signOut() {
    this.userLoggedIn = !this.userLoggedIn;
    this.sessionService.endSession();
  }
}
