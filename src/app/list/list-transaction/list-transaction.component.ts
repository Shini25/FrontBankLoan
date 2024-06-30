import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transactions } from '../../models/transactions.model'; // Assurez-vous que le modèle est correctement défini
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateConfirmationDialogComponent } from './update-confirmation-dialog/update-confirmation-dialog.component';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateConfirmationDialogComponent
  ],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {
  displayedColumns: string[] = ['transactionid', 'loanid', 'amount', 'transactiondate', 'transactiontype', 'client_firstname', 'actions'];
  dataSource: any[] = [];
  searchText: string = '';

  constructor(private transactionsService: TransactionsService, private loansService: LoansService, private clientsService: ClientsService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getAllTransactions().subscribe(transactions => {
      this.loadLoans(transactions);
    });
  }

  loadLoans(transactions: Transactions[]): void {
    const loanRequests = transactions.map(transaction =>
      this.loansService.getLoanById(transaction.loanid).pipe(
        map(loan => {
          return this.clientsService.getClientById(loan.clientid).pipe(
            map(client => ({ ...transaction, client_firstname: client.firstname }))
          );
        }),
        switchMap(clientObservable => clientObservable)
      )
    );

    forkJoin(loanRequests).subscribe(data => {
      this.dataSource = data;
    });
  }

  onSearchTextChange(): void {
    const transactionId = Number(this.searchText);
    if (this.searchText.trim() === '') {
      this.loadTransactions();
    } else if (!isNaN(transactionId)) {
      this.transactionsService.getTransactionById(transactionId).subscribe(transaction => {
        this.loadLoans([transaction]);
      });
    } else {
      this.loadTransactions();
    }
  }
  openUpdateDialog(transaction: Transactions): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTransaction(transaction, result);
      }
    });
  }

  updateTransaction(before: Transactions, after: Transactions): void {
    this.transactionsService.updateTransaction(after.transactionid, after).subscribe(() => {
      this.loadTransactions();
      this.dialog.open(UpdateConfirmationDialogComponent, {
        width: '400px',
        data: { before, after }
      });
    });
  }

  openDeleteDialog(transactionid: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { transactionid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTransaction(transactionid);
      }
    });
  }

  deleteTransaction(transactionid: number): void {
    this.transactionsService.deleteTransaction(transactionid).subscribe(() => {
      this.loadTransactions();
      this.snackBar.open('Transaction successfully deleted', 'Close', {
        duration: 3000,
      });
    });
  }
}