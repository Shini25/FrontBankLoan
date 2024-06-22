import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transactions } from '../../models/transactions.model'; // Assurez-vous que le modèle est correctement défini
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {
  displayedColumns: string[] = ['transactionid', 'clientid', 'loanid', 'amount', 'transactiondate', 'transactiontype'];
  dataSource: Transactions[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getAllTransactions().subscribe(transactions => {
      this.dataSource = transactions;
    });
  }
}