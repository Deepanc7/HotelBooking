import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginServiceService } from '../login-page/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>, private userService: LoginServiceService, private router: Router) { }

  confirmLogout(): void {
    sessionStorage.removeItem('userName');
    this.userService.logout().subscribe((response) => {
      if (response.message === 'Logout successful') {
        this.userService.clearCookie();
        this.dialogRef.close(true);
        this.router.navigate(['/']);
      } else {
      }
    });

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
