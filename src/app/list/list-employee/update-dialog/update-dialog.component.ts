import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Employees } from '../../../models/employees.model';

@Component({
  selector: 'app-update-dialog',
  template: `
    <h1 mat-dialog-title>Update Employee</h1>
    <div mat-dialog-content>
      <form [formGroup]="updateForm">
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input type="text" id="firstname" formControlName="firstname" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input type="text" id="lastname" formControlName="lastname" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="text" id="phone" formControlName="phone" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="position">Position</label>
          <input type="text" id="position" formControlName="position" class="form-control" required>
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
    @Inject(MAT_DIALOG_DATA) public data: Employees,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      username: [data.username],
      firstname: [data.firstname, Validators.required],
      lastname: [data.lastname, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      position: [data.position, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
