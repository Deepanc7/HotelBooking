import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  constructor(private builder: FormBuilder, private router: Router, private toastr: ToastrService) {
  }
loginSuccess:Boolean=false;

  loginForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });


  loginNow() {
    if (this.loginForm.valid) {
      const storedUserStr = localStorage.getItem(this.loginForm.value.email || '')
      if (storedUserStr !== null) {
        const storedUser = JSON.parse(storedUserStr);

        if (storedUser && storedUser.password === this.loginForm.value.password) {
          if (storedUser.isactive) {
            sessionStorage.setItem('id', storedUser.id);
            sessionStorage.setItem('role', storedUser.role);
            this.router.navigate(['/homePage']);
            this.loginSuccess = true;

            this.toastr.success('You\'ve successfully cracked the code to your account. Hello there!', 'Login Successful');
          } else {
            this.loginSuccess = true;
            this.toastr.success('You\'ve successfully cracked the code to your account. Hello there!', 'Login Successful');
          }
        } else {
          this.toastr.error('Error 404: Password genius not found. Please retry.', 'Invalid credentials');
        }
      } else {
        this.toastr.error('Looks like our virtual dictionary doesn\'t have that entry. Fancy another try?', 'Enter valid details');
      }
    }
  }
}
