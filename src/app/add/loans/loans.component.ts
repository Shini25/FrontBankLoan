import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Include CommonModule here
})
export class AddLoanComponent implements OnInit {
  loanForm!: FormGroup;
  clients: Clients[] = [];

  constructor(private fb: FormBuilder, private loansService: LoansService, private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanid: [null],
      clientid: [null, Validators.required],
      amount: [null, Validators.required],
      interestrate: [null, Validators.required],
      durationmonths: [null, Validators.required],
      startdate: [null, Validators.required],
      loantype: ['', Validators.required],
      status: ['', Validators.required]
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
      const newLoan: Loans = this.loanForm.value;
      this.loansService.addLoan(newLoan).subscribe({
        next: (loan) => {
          console.log('Loan added:', loan);
        },
        error: (error) => {
          console.error('Error adding loan:', error);
        }
      });
    }
  }
}