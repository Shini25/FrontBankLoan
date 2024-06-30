import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule]
})
export class AddLoanComponent implements OnInit {
  loanForm!: FormGroup;
  clients: Clients[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private loansService: LoansService, private clientsService: ClientsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanid: [null],
      clientid: [null, Validators.required],
      amount: [null, Validators.required],
      interestrate: [15, Validators.required],
      durationmonths: [null, Validators.required],
      startdate:  [new Date(), Validators.required], 
      loantype: ['', Validators.required],
      status: ['pending', Validators.required]
    });

    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      this.isLoading = true;
      const newLoan: Loans = this.loanForm.value;
      this.loansService.addLoan(newLoan).subscribe({
        next: (loan) => {
          console.log('Loan added:', loan);
          this.snackBar.open('Loan added successfully!', 'Close', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/add-guarantee']);
            this.isLoading = false;
          }, 1000); // Delay to show the spinner
        },
        error: (error) => {
          console.error('Error adding loan:', error);
          this.snackBar.open('Error adding loan', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        }
      });
    }
  }

  onClear(): void {
    this.loanForm.reset();
  }
}