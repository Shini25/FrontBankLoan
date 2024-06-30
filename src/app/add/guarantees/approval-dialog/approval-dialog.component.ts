import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approval-dialog',
  template: `
    <h1 mat-dialog-title>Approval Pending</h1>
    <div mat-dialog-content class="col-12">
      <p>Your loan is under review. Please wait for approval.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">OK</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule]
})
export class ApprovalDialogComponent {
  constructor(public dialogRef: MatDialogRef<ApprovalDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}