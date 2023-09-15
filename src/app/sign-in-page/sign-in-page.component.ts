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
        this.userService.login(email, String(password)).subscribe(
          (response) => {
            if (response.message==="Authentication successful") {
              let user = this.userService.getUserByEmail(email).subscribe(
                (user) => {
                  console.log(user)
                  this.userService.setAuthToken(user.name);
                  this.userService.setEmailToken(email);
                }
              );
              this.toastr.success('You\'ve successfully cracked the code to your account. Hello there!', 'Login Successful');
              this.router.navigate(['/']);
            } else {
              this.toastr.error('Error 404: Password genius not found. Please retry.', response.message);
            }
          },
          (error) => {
            this.toastr.error('Error', 'Login Unsuccessful');
          }
        );

        }
    }
}
}