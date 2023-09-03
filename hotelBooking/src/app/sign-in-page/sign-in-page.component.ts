import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from '../login-page/login-service.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  constructor(private builder: FormBuilder, private router: Router, private toastr: ToastrService, private userService: LoginServiceService) {
  }

  loginSuccess: Boolean = false;

  loginForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });


  loginNow() {

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if (email !== null && email !== undefined) {
        const user = this.userService.getUserByEmail(email);

        if (user !== undefined && user.password === password) {
          if (user.isactive) {
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('role', user.role);
            this.router.navigate(['/homePage']);
            this.loginSuccess = true;

            this.toastr.success('You\'ve successfully cracked the code to your account. Hello there!', 'Login Successful');
            sessionStorage.setItem('userName', user.name);
          } else {
            this.loginSuccess = true;
            this.toastr.success('You\'ve successfully cracked the code to your account. Hello there!', 'Login Successful');
            sessionStorage.setItem('userName', user.name);
          }
        } else {
          this.toastr.error('Error 404: Password genius not found. Please retry.', 'Invalid credentials');
        }
      } else {
        this.toastr.error('Email is required', 'Invalid Email');
      }
    }
  }

}
