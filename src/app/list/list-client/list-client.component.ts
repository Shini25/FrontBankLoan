import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateConfirmationDialogComponent } from './update-confirmation-dialog/update-confirmation-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, DeleteDialogComponent, UpdateDialogComponent, UpdateConfirmationDialogComponent],
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['clientid', 'firstname', 'lastname', 'email', 'phone', 'address', 'birthdate', 'balance', 'actions'];
  dataSource: Clients[] = [];
  searchText: string = '';

  constructor(private clientsService: ClientsService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.dataSource = clients;
    });
  }

  onSearchTextChange(): void {
    this.clientsService.searchClientsByFirstNameOrLastName(this.searchText).subscribe(clients => {
      console.log('Clients found:', clients); // Ajoutez ce log pour vérifier les données reçues
      this.dataSource = clients;
    });
  }

  openUpdateDialog(client: Clients): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: { ...client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateClient(client, result);
      }
    });
  }

  updateClient(before: Clients, after: Clients): void {
    this.clientsService.updateClient(after).subscribe(() => {
      this.loadClients();
      this.dialog.open(UpdateConfirmationDialogComponent, {
        width: '400px',
        data: { before, after }
      });
    });
  }

  openDeleteDialog(clientid: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { clientid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(clientid);
      }
    });
  }

  deleteClient(clientid: number): void {
    this.clientsService.deleteClient(clientid).subscribe(() => {
      this.loadClients();
      this.snackBar.open('Client successfully deleted', 'Close', {
        duration: 3000,
      });
    });
  }
}
