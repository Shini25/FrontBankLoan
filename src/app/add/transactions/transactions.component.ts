import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TransactionsService } from '../../services/transactions.service';
import { LoansService } from '../../services/loans.service';
import { ClientsService } from '../../services/clients.service';
import { Loans } from '../../models/loans.model';
import { Clients } from '../../models/clients.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddTransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  loans: Loans[] = [];
  clients: Clients[] = [];

  constructor(private fb: FormBuilder, private transactionsService: TransactionsService, private loansService: LoansService, private clientsService: ClientsService) {
    this.transactionForm = this.fb.group({
      clientid: [null, Validators.required],
      loanid: [null, Validators.required],
      amount: [null, Validators.required],
      transactiondate: [null, Validators.required],
      transactiontype: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadClients();
  }

  loadLoans(): void {
    this.loansService.getAllLoans().subscribe(loans => {
      this.loans = loans;
    });
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  addTransaction() {
    if (this.transactionForm.valid) {
      this.transactionsService.addTransaction(this.transactionForm.value).subscribe({
        next: (res) => console.log('Transaction added successfully', res),
        error: (err) => console.error('Error adding transaction', err)
      });
    }
  }
}