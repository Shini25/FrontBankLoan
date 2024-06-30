import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionsService } from '../../services/transactions.service';
import { LoansService } from '../../services/loans.service';
import { ClientsService } from '../../services/clients.service';
import { Loans } from '../../models/loans.model';
import { Clients } from '../../models/clients.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AddTransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  loans: Loans[] = [];
  clients: Clients[] = [];

  constructor(private fb: FormBuilder, private transactionsService: TransactionsService, private loansService: LoansService, private clientsService: ClientsService, private snackBar: MatSnackBar) {
    this.transactionForm = this.fb.group({
      loanid: [null, Validators.required],
      amount: [null, Validators.required],
      transactiondate: [new Date(), Validators.required],  // Fixer la date de transaction à la date actuelle
      transactiontype: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadClients();

    this.transactionForm.get('transactiontype')?.valueChanges.subscribe(value => {
      if (value === 'loan') {
        const selectedLoan = this.loans.find(loan => loan.loanid === this.transactionForm.get('loanid')?.value);
        if (selectedLoan) {
          this.transactionForm.patchValue({ amount: selectedLoan.amount });
        }
      } else {
        this.transactionForm.patchValue({ amount: null });
      }
    });

    this.transactionForm.get('loanid')?.valueChanges.subscribe(loanId => {
      if (this.transactionForm.get('transactiontype')?.value === 'loan') {
        const selectedLoan = this.loans.find(loan => loan.loanid === loanId);
        if (selectedLoan) {
          this.transactionForm.patchValue({ amount: selectedLoan.amount });
        }
      }
    });
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
      if (this.transactionForm.get('transactiontype')?.value === 'loan') {
        const selectedLoan = this.loans.find(loan => loan.loanid === this.transactionForm.get('loanid')?.value);
        if (selectedLoan) {
          this.transactionForm.patchValue({ amount: selectedLoan.amount });
        }
      }
      this.transactionsService.addTransaction(this.transactionForm.value).subscribe({
        next: (res) => {
          console.log('Transaction added successfully', res);
          this.snackBar.open('Transaction completed successfully!', 'Close', {
            duration: 3000,
          });
          this.generatePDF(res);
        },
        error: (err) => console.error('Error adding transaction', err)
      });
    }
  }

  generatePDF(transaction: any) {
    const doc = new jsPDF();
    doc.text('Transaction Details', 10, 10);
    doc.text(`Transaction ID: ${transaction.transactionid}`, 10, 20);
    doc.text(`Loan ID: ${transaction.loanid}`, 10, 30);
    doc.text(`Amount: ${transaction.amount}`, 10, 40);
    doc.text(`Transaction Date: ${transaction.transactiondate}`, 10, 50);
    doc.text(`Transaction Type: ${transaction.transactiontype}`, 10, 60);
    doc.save('transaction.pdf');
  }
}