import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentsService } from '../../services/payments.service';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddPaymentsComponent implements OnInit {
  paymentForm!: FormGroup;
  loans: Loans[] = [];

  constructor(private fb: FormBuilder, private paymentsService: PaymentsService, private loansService: LoansService) {
    this.paymentForm = this.fb.group({
      paymentid: [null],
      loanid: [null, Validators.required],
      paymentamount: [null, Validators.required],
      paymentdate: [null, Validators.required],
      paymenttype: ['', Validators.required]
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

  addPayment() {
    if (this.paymentForm.valid) {
      this.paymentsService.addPayment(this.paymentForm.value).subscribe({
        next: (res) => console.log('Payment added successfully', res),
        error: (err) => console.error('Error adding payment', err)
      });
    }
  }
}