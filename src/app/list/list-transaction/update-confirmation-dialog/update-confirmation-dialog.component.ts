import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Transactions } from '../../../models/transactions.model';

@Component({
  selector: 'app-update-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Update Confirmation</h1>
    <div mat-dialog-content>
      <h2>Before Update</h2>
      <p><strong>Loan ID:</strong> {{data.before.loanid}}</p>
      <p><strong>Amount:</strong> {{data.before.amount}}</p>
      <p><strong>Date:</strong> {{data.before.transactiondate | date}}</p>
      <p><strong>Type:</strong> {{data.before.transactiontype}}</p>
      <h2>After Update</h2>
      <p><strong>Loan ID:</strong> {{data.after.loanid}}</p>
      <p><strong>Amount:</strong> {{data.after.amount}}</p>
      <p><strong>Date:</strong> {{data.after.transactiondate | date}}</p>
      <p><strong>Type:</strong> {{data.after.transactiontype}}</p>
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
    @Inject(MAT_DIALOG_DATA) public data: { before: Transactions, after: Transactions }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}