import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title:string = "INNSIGHT";
  toggleBtn:boolean=true;

  ngOnInit(): void {
this.toggleBtn = false;
  }

  toggleFun1(){
    this.toggleBtn = true;
  }
  toggleFun2(){
    this.toggleBtn = false;
  }
}
