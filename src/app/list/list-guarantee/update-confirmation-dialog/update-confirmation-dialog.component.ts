import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { Guarantees } from '../../../models/guarantees.model';

@Component({
  selector: 'app-update-confirmation-dialog',
  templateUrl: './update-confirmation-dialog.component.html', // Use external HTML file
  styles: [`
    .update-section {
      display: flex;
      justify-content: space-between;
      width: 100%; /* Ajoutez cette ligne pour élargir la section */
    }
    .update-column {
      flex: 1;
      margin: 0 10px;
    }
  `],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule] // Add MatIconModule to imports
})
export class UpdateConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { before: Guarantees, after: Guarantees }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}