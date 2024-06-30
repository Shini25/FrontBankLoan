import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Loans } from '../../../models/loans.model';

@Component({
  selector: 'app-update-dialog',
  template: `
    <h1 mat-dialog-title>Update Loan</h1>
    <div mat-dialog-content>
      <form [formGroup]="updateForm">

        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" formControlName="amount" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="durationmonths">Duration (Months)</label>
          <input type="number" id="durationmonths" formControlName="durationmonths" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="loantype">Loan Type</label>
          <input type="text" id="loantype" formControlName="loantype" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <input type="text" id="status" formControlName="status" class="form-control" required>
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
    @Inject(MAT_DIALOG_DATA) public data: Loans,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      loanid: [data.loanid],
      clientid: [data.clientid],
      amount: [data.amount, Validators.required],
      interestrate: [data.interestrate],
      durationmonths: [data.durationmonths, Validators.required],
      startdate: [data.startdate],
      loantype: [data.loantype, Validators.required],
      status: [data.status, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}