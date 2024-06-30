import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Employees } from '../../../models/employees.model';

@Component({
  selector: 'app-update-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Update Confirmation</h1>
    <div mat-dialog-content>
      <h2>Before Update</h2>
      <p><strong>First Name:</strong> {{data.before.firstname}}</p>
      <p><strong>Last Name:</strong> {{data.before.lastname}}</p>
      <p><strong>Email:</strong> {{data.before.email}}</p>
      <p><strong>Phone:</strong> {{data.before.phone}}</p>
      <p><strong>Position:</strong> {{data.before.position}}</p>
      <h2>After Update</h2>
      <p><strong>First Name:</strong> {{data.after.firstname}}</p>
      <p><strong>Last Name:</strong> {{data.after.lastname}}</p>
      <p><strong>Email:</strong> {{data.after.email}}</p>
      <p><strong>Phone:</strong> {{data.after.phone}}</p>
      <p><strong>Position:</strong> {{data.after.position}}</p>
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
    @Inject(MAT_DIALOG_DATA) public data: { before: Employees, after: Employees }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
