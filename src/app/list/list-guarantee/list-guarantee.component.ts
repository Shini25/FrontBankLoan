import { Component, OnInit } from '@angular/core';
import { GuaranteesService } from '../../services/guarantees.service';
import { Guarantees } from '../../models/guarantees.model';
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
  selector: 'app-list-guarantee',
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
  templateUrl: './list-guarantee.component.html',
  styleUrls: ['./list-guarantee.component.css']
})
export class ListGuaranteeComponent implements OnInit {
  displayedColumns: string[] = ['guaranteeid', 'clientname', 'guaranteetype', 'estimatedvalue', 'description', 'actions'];
  dataSource: Guarantees[] = [];
  searchText: string = '';

  constructor(private guaranteesService: GuaranteesService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadGuarantees();
  }

  loadGuarantees(): void {
    this.guaranteesService.getAllGuarantees().subscribe(guarantees => {
      this.dataSource = guarantees;
    });
  }

  onSearchTextChange(): void {
    const loanid = parseInt(this.searchText, 10);
    if (!isNaN(loanid)) {
      this.guaranteesService.getGuaranteesByLoanId(loanid).subscribe(guarantees => {
        console.log('Guarantees found:', guarantees);
        this.dataSource = guarantees;
      });
    } else {
      this.loadGuarantees();
    }
  }

  openUpdateDialog(guarantee: Guarantees): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...guarantee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateGuarantee(guarantee, result);
      }
    });
  }

  updateGuarantee(before: Guarantees, after: Guarantees): void {
    this.guaranteesService.updateGuarantee(after.guaranteeid, after).subscribe(() => {
      this.loadGuarantees();
      this.dialog.open(UpdateConfirmationDialogComponent, {
        width: '400px',
        data: { before, after }
      });
    });
  }

  openDeleteDialog(guaranteeid: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { guaranteeid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGuarantee(guaranteeid);
      }
    });
  }

  deleteGuarantee(guaranteeid: number): void {
    this.guaranteesService.deleteGuarantee(guaranteeid).subscribe(() => {
      this.loadGuarantees();
      this.snackBar.open('Guarantee successfully deleted', 'Close', {
        duration: 3000,
      });
    });
  }
}