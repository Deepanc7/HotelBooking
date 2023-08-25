import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  constructor(private builder: FormBuilder, private router: Router, private service: AuthenticationService) { 
  }

  result:any;

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  loginNow() {
    if (this.loginForm.valid) {
      const storedUserStr = localStorage.getItem(this.loginForm.value.id || '')
      if (storedUserStr !== null) {
        const storedUser = JSON.parse(storedUserStr);
      
      if (storedUser && storedUser.password === this.loginForm.value.password) {
        if (storedUser.isactive) {
          sessionStorage.setItem('id', storedUser.id);
          sessionStorage.setItem('role', storedUser.role);
          this.router.navigate(['/homePage']);
          alert("Login Successful");
        } else {
          alert("Login Successful");
        }
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Enter valid details");
    }
  }
}
}
