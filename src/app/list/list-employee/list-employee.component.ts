import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employees } from '../../models/employees.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateConfirmationDialogComponent } from './update-confirmation-dialog/update-confirmation-dialog.component';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSnackBarModule, DeleteDialogComponent, UpdateDialogComponent, UpdateConfirmationDialogComponent],
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'position', 'email', 'phone', 'actions'];
  dataSource: Employees[] = [];
  searchText: string = '';

  constructor(private employeesService: EmployeesService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeesService.getAllEmployees().subscribe(employees => {
      this.dataSource = employees;
    });
  }

  onSearchTextChange(): void {
    this.employeesService.searchEmployeesByFirstNameOrLastName(this.searchText).subscribe(employees => {
      console.log('Employees found:', employees);
      this.dataSource = employees;
    });
  }

  openUpdateDialog(employee: Employees): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEmployee(employee, result);
      }
    });
  }

  updateEmployee(before: Employees, after: Employees): void {
    this.employeesService.updateEmployee(after).subscribe(() => {
      this.loadEmployees();
      this.dialog.open(UpdateConfirmationDialogComponent, {
        width: '400px',
        data: { before, after }
      });
    });
  }

  openDeleteDialog(username: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(username);
      }
    });
  }

  deleteEmployee(username: string): void {
    this.employeesService.deleteEmployee(username).subscribe(() => {
      this.loadEmployees();
      this.snackBar.open('Employee successfully deleted', 'Close', {
        duration: 3000,
      });
    });
  }
}