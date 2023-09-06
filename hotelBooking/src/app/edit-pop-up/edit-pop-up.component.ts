import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss'],
  providers: [DatePipe]
})
export class EditPopUpComponent {

  newdate=new Date();
  editedData: any = {
    hotel:null,
    checkInDate: null,
    checkOutDate: null,
    RoomDetails: '',
    GuestCount: 0,
  };

  constructor(private toastr: ToastrService,private datePipe: DatePipe, private dialogRef: MatDialogRef<EditPopUpComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
    this.editedData = { ...data };
  }

  saveChanges() {
    if (this.editedData.checkInDate === this.editedData.checkOutDate) {
      this.toastr.error("You cannot check in and check out on same date", "Error");
    }
    else if (this.editedData.RoomDetails === null) {
      this.toastr.error('Room details cannot be null', 'Error');
    }
    else if (this.editedData.GuestCount === 0) {
      this.toastr.error('Guests cannot be 0', 'Error');
    }
    else if (this.editedData.checkInDate === null) {
      this.toastr.error('CheckIn date is null', 'Error');
    }
    else if (this.editedData.checkOutDate === null) {
      this.toastr.error('CheckOut date is null', 'Error');
    }
    else {
      this.editedData.checkInDate = String(this.editedData.checkInDate);
      this.editedData.checkOutDate = String(this.editedData.checkOutDate);
      this.dialogRef.close(this.editedData);
    }
  }

  filterPastDates = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const currentDate = new Date();
    return d >= currentDate;
  };

  closeDialog() {
    this.dialogRef.close();
  }

  // Function to handle datepicker input events
  onDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.editedData[type] = event.value;
  }
}
