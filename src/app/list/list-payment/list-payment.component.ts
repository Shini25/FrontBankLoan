import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../../services/payments.service';
import { Payments } from '../../models/payments.model'; // Assurez-vous que le modèle est correctement défini
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-payment',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  displayedColumns: string[] = ['paymentid', 'loanid', 'paymentamount', 'paymentdate', 'paymenttype'];
  dataSource: Payments[] = [];

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentsService.getAllPayments().subscribe(payments => {
      this.dataSource = payments;
    });
  }
}