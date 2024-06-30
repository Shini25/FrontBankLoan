import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Guarantees } from '../../../models/guarantees.model';

@Component({
  selector: 'app-update-dialog',
  template: `
    <h1 mat-dialog-title>Update Guarantee</h1>
    <div mat-dialog-content>
      <form [formGroup]="updateForm">
        <div class="form-group">
          <label for="guaranteetype">Guarantee Type</label>
          <input type="text" id="guaranteetype" formControlName="guaranteetype" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estimatedvalue">Estimated Value</label>
          <input type="number" id="estimatedvalue" formControlName="estimatedvalue" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" id="description" formControlName="description" class="form-control" required>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="updateForm.value" [disabled]="!updateForm.valid">Update</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule]
})
export class UpdateDialogComponent {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Guarantees,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      guaranteeid: [data.guaranteeid],
      loanid: [data.loanid],
      guaranteetype: [data.guaranteetype, Validators.required],
      estimatedvalue: [data.estimatedvalue, Validators.required],
      description: [data.description, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}