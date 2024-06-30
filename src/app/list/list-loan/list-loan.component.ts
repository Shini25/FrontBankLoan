import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Loans } from '../../models/loans.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateConfirmationDialogComponent } from './update-confirmation-dialog/update-confirmation-dialog.component';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DeleteDialogComponent,
    UpdateDialogComponent,
    UpdateConfirmationDialogComponent
  ],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.css']
})
export class ListLoanComponent implements OnInit {
  displayedColumns: string[] = ['loanid', 'clientid', 'amount', 'remaining_amount', 'interestrate', 'durationmonths', 'startdate', 'loantype', 'status', 'actions'];
  dataSource: Loans[] = [];
  searchText: string = '';

  constructor(private loansService: LoansService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loansService.getAllLoans().subscribe(loans => {
      this.dataSource = loans;
    });
  }

  onSearchTextChange(): void {
    const loanid = parseInt(this.searchText, 10);
    if (!isNaN(loanid)) {
      this.loansService.getLoanById(loanid).subscribe(loan => {
        this.dataSource = loan ? [loan] : [];
      });
    } else {
      this.loadLoans();
    }
  }

  openUpdateDialog(loan: Loans): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...loan }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLoan(loan, result);
      }
    });
  }

  updateLoan(before: Loans, after: Loans): void {
    this.loansService.updateLoan(after.loanid, after).subscribe(() => {
      this.loadLoans();
      this.dialog.open(UpdateConfirmationDialogComponent, {
        width: '400px',
        data: { before, after }
      });
    });
  }

  openDeleteDialog(loanid: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { loanid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLoan(loanid);
      }
    });
  }

  deleteLoan(loanid: number): void {
    this.loansService.deleteLoan(loanid).subscribe(() => {
      this.loadLoans();
      this.snackBar.open('Loan successfully deleted', 'Close', {
        duration: 3000,
      });
    });
  }
}