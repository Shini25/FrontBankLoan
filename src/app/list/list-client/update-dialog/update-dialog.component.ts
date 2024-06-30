import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Clients } from '../../../models/clients.model';

@Component({
  selector: 'app-update-dialog',
  template: `
    <h1 mat-dialog-title>Update Client</h1>
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
          <label for="address">Address</label>
          <input type="text" id="address" formControlName="address" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Birth Date</label>
          <input type="date" id="birthdate" formControlName="birthdate" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="balance">Balance</label>
          <input type="number" id="balance" formControlName="balance" class="form-control" required>
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
    @Inject(MAT_DIALOG_DATA) public data: Clients,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      clientid: [data.clientid],
      firstname: [data.firstname, Validators.required],
      lastname: [data.lastname, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      address: [data.address, Validators.required],
      birthdate: [data.birthdate, Validators.required],
      balance: [data.balance, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
