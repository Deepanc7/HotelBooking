import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  constructor(private builder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  registersForm = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(8)])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control('')
  });


  register() {
    if (this.registersForm.valid) {
      const user: User = {
        id: this.registersForm.value.id || '',
        password: this.registersForm.value.password || '',
        name: this.registersForm.value.name || '',
        email: this.registersForm.value.email || '',
        gender: this.registersForm.value.gender || '',
        role: this.registersForm.value.role || '',
        isactive: true
      };

      localStorage.setItem(user.id, JSON.stringify(user));
      this.toastr.success('Prepare for adventure – your registration victory just unlocked the door.', 'Registration successful');
      this.router.navigate(['/signin']);
    } else {
      this.toastr.error('Enter valid details', 'Error');
    }
  }

}
