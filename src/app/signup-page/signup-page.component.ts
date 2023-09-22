import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.interface';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from '../login-page/login-service.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  constructor(private builder: FormBuilder, private router: Router, private toastr: ToastrService, private userService: LoginServiceService) { }

  registersForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('',[Validators.required, Validators.minLength(8)]),
    email: this.builder.control('',[Validators.required, Validators.email]),
  });
 
  register() {
    if (this.registersForm.valid) {
      const user: User = {
               password: this.registersForm.value.password || '',
               name: this.registersForm.value.name || '',
               email: this.registersForm.value.email || '',
             };

      this.userService.addUser(user).subscribe(
        (response: any) => {
          this.toastr.success('Prepare for adventure – your registration victory just unlocked the door.', 'Registration successful');
          this.router.navigate(['/signin']);
        },
        (error: any) => {
          if (error.status === 400 && error.error.message === 'Email already registered') {
            this.toastr.error('Email already exists', 'Registration unsuccessful');
          } else {
            this.toastr.error('An error occurred during registration', 'Registration unsuccessful');
          }
        }
      );
    } else {
      this.toastr.error('Enter valid details', 'Error');
    }
  }
}

