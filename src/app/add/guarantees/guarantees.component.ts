import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuaranteesService } from '../../services/guarantees.service';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApprovalDialogComponent } from './approval-dialog/approval-dialog.component'; // Import the dialog component
import { RouterModule } from '@angular/router'; // Add RouterModule here

@Component({
  selector: 'app-guarantees',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    RouterModule // Add RouterModule here
  ],
  templateUrl: './guarantees.component.html',
  styleUrls: ['./guarantees.component.css']
})
export class AddGuaranteesComponent implements OnInit {
  guaranteeForm: FormGroup;
  loans: Loans[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private guaranteesService: GuaranteesService, 
    private loansService: LoansService, 
    private snackBar: MatSnackBar, 
    private dialog: MatDialog, // Inject MatDialog
    private router: Router
  ) {
    this.guaranteeForm = this.fb.group({
      guaranteeid: [null],
      loanid: [null, Validators.required],
      guaranteetype: ['', Validators.required],
      estimatedvalue: [''],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loansService.getAllLoans().subscribe(loans => {
      this.loans = loans;
    });
  }

  addGuarantee() {
    if (this.guaranteeForm.valid) {
      this.isLoading = true;
      this.guaranteesService.addGuarantee(this.guaranteeForm.value).subscribe({
        next: (res) => {
          console.log('Guarantee added successfully', res);
          this.snackBar.open('Guarantee added successfully!', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
          this.openApprovalDialog(); // Open the dialog after adding the guarantee
        },
        error: (err) => {
          console.error('Error adding guarantee', err);
          this.snackBar.open('Error adding guarantee', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      });
    }
  }

  openApprovalDialog(): void {
    this.dialog.open(ApprovalDialogComponent, {
      width: '300px'
    });
  }

  onClear(): void {
    this.guaranteeForm.reset();
  }
}