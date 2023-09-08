import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) {}

  confirmLogout(): void {
    sessionStorage.removeItem('userName');
    this.dialogRef.close(true);
    
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
