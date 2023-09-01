import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss'],
  providers: [DatePipe]
})
export class EditPopUpComponent {
  editedData: any = {};
  checkInDateIsInPast: boolean = false;

  constructor(
    private toastr: ToastrService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.editedData = { ...data };
  }

  saveChanges(): void {
    let newdate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    const currentDate = new Date();
    const checkInDate = new Date(this.editedData.checkInDate);

    if (this.editedData.checkInDate === this.editedData.checkOutDate) {
      this.toastr.error("You cannot check in and check out on same date", "Error");
    }
    else if (checkInDate <= currentDate) {
      this.checkInDateIsInPast = true;
      this.toastr.error("Cannot select past date", "Error");
      return;
    }
    else if (this.editedData.RoomDetails === null) {
      this.toastr.error('Room details cannot be null', 'Error');
    }
    else if (this.editedData.GuestCount === 0) {
      this.toastr.error('Guests cannot be 0', 'Error');
    }
    else if (this.editedData.checkInDate === newdate && this.editedData.checkOutDate === newdate) {
      this.toastr.error('CheckIn date is null', 'Error');
    }
    else if (this.editedData.checkOutDate === newdate) {
      this.toastr.error('CheckOut date is null', 'Error');
    }
    else if (this.editedData.checkInDate > this.editedData.checkOutDate) {
      this.toastr.error('CheckOut date is older than checkin date', 'Error');
    }
    else {
      this.editedData.checkInDate = String(this.editedData.checkInDate).split('-').reverse().join('-');
      this.editedData.checkOutDate = String(this.editedData.checkOutDate).split('-').reverse().join('-')
      this.dialogRef.close(this.editedData);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
