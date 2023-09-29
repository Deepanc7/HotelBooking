import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { CookieInteractionService } from '../service/cookieinteraction.service';
import { SessionServiceService } from '../service/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {
  constructor(private router: Router, private sessionService: SessionServiceService, private formBuilder: FormBuilder, private httpService: HttpService, private cookieInteractionService: CookieInteractionService) { }
  loginForm: any;
  loginValidation: string | null = null;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  async login() {
    if (this.loginForm.get('email').valid && this.loginForm.get('password').valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';
      const admin = {
        'email': email,
        'password': password
      };

      try {
        const response = await this.httpService.postData('/admin/logIn', admin).toPromise();
        const adminDetail = response;
        console.log(adminDetail);
        if (adminDetail != "Credentials Invalid !!") {
          this.loginValidation = null;
          this.sessionService.startSession(adminDetail);
        } else {
          this.loginValidation = 'Invalid credentials..!'
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.loginForm.reset();
  }

  inputCheck() {
    this.loginValidation = null;
  }
}
