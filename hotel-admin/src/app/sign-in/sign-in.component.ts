import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private router: Router, private formBuilder: FormBuilder) { }

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

  login(): void {
    if (this.loginForm.get('email').valid && this.loginForm.get('password').valid) {
      this.loginValidation = null;
      // if (this.userAlready(this.loginForm.get('username').value)) {
      //   const item = JSON.parse(this.localStorageService.getLocalStorageItem(this.loginForm.get('username').value) as string);
      //   if (item.password === this.loginForm.get('password').value) {
      //     this.localStorageService.setLocalStorageItem('notificationCount', '0');
      //     this.localStorageService.setLocalStorageItem('currentUser', this.loginForm.get('username').value);
      //     if (this.localStorageService.getLocalStorageItem('previousState')) {
      //       this.router.navigate(['/clothes/search', this.localStorageService.getLocalStorageItem('previousState')])
      //       this.localStorageService.removeLocalStorageItem('previousState');
      //     }
      //     else {
      //       this.router.navigate(['/'])
      //     }
      //   }
      //   else {
      //     this.loginValidation = 'Incorrect password'
      //   }
      // } else {
      //   this.loginValidation = "User doesn't exist";
      // }
    }
    this.loginForm.reset();
  }

  // userAlready(username: string): boolean {
  //   if (this.localStorageService.getLocalStorageItem(username)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  inputCheck() {
    this.loginValidation = null;
  }
  // signOut() {
  //   this.localStorageService.removeLocalStorageItem('currentUser');
  //   this.userPresent = this.localStorageService.getLocalStorageItem('currentUser') ? true : false;
  //   this.reqFromAccIcon = this.localStorageService.getLocalStorageItem('accountIcon') === 'true' ? true : false;
  // }
}
