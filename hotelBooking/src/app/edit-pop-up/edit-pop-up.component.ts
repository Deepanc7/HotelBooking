import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss']
})
export class EditPopUpComponent {
  editedData: any = {};

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editedData = { ...data };
  }

  saveChanges(): void {
    if (this.editedData.checkInDate>this.editedData.checkOutDate){
      this.toastr.error('CheckOut date is older than checkin date', 'Error');
    }
    else {
    this.dialogRef.close(this.editedData);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
