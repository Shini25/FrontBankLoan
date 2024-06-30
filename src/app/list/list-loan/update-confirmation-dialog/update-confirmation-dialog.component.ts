import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Loans } from '../../../models/loans.model';

@Component({
  selector: 'app-update-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Update Confirmation</h1>
    <div mat-dialog-content>
      <h2>Before Update</h2>
      <p><strong>Client ID:</strong> {{data.before.clientid}}</p>
      <p><strong>Amount:</strong> {{data.before.amount}}</p>
      <p><strong>Interest Rate:</strong> {{data.before.interestrate}}</p>
      <p><strong>Duration (Months):</strong> {{data.before.durationmonths}}</p>
      <p><strong>Start Date:</strong> {{data.before.startdate}}</p>
      <p><strong>Loan Type:</strong> {{data.before.loantype}}</p>
      <p><strong>Status:</strong> {{data.before.status}}</p>
      <h2>After Update</h2>
      <p><strong>Client ID:</strong> {{data.after.clientid}}</p>
      <p><strong>Amount:</strong> {{data.after.amount}}</p>
      <p><strong>Interest Rate:</strong> {{data.after.interestrate}}</p>
      <p><strong>Duration (Months):</strong> {{data.after.durationmonths}}</p>
      <p><strong>Start Date:</strong> {{data.after.startdate}}</p>
      <p><strong>Loan Type:</strong> {{data.after.loantype}}</p>
      <p><strong>Status:</strong> {{data.after.status}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class UpdateConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { before: Loans, after: Loans }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}