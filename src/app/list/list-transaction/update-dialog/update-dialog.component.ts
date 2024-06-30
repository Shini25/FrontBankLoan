import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Transactions } from '../../../models/transactions.model';

@Component({
  selector: 'app-update-dialog',
  template: `
    <h1 mat-dialog-title>Update Transaction</h1>
    <div mat-dialog-content>
      <form [formGroup]="updateForm">
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" formControlName="amount" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="transactiondate">Date</label>
          <input type="date" id="transactiondate" formControlName="transactiondate" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="transactiontype">Type</label>
          <input type="text" id="transactiontype" formControlName="transactiontype" class="form-control" required>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="updateForm.value" [disabled]="!updateForm.valid">Update</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, ReactiveFormsModule]
})
export class UpdateDialogComponent {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transactions,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      transactionid: [data.transactionid],
      loanid: [data.loanid, Validators.required],
      amount: [data.amount, Validators.required],
      transactiondate: [data.transactiondate, Validators.required],
      transactiontype: [data.transactiontype, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}