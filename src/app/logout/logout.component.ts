import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginServiceService } from '../login-page/login-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>, private userService: LoginServiceService) { }

  confirmLogout(): void {
    sessionStorage.removeItem('userName');
    this.userService.logout().subscribe((response) => {
      if (response.message === 'Logout successful') {
        this.userService.clearCookie();
        this.dialogRef.close(true);
      } else {
      }
    });

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
