import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['clientid', 'firstname', 'lastname', 'email', 'phone', 'address', 'birthdate', 'balance'];
  dataSource: Clients[] = [];
  searchText: string = '';
  searchLastName: string = '';

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.dataSource = clients;
    });
  }

  onSearchTextChange(): void {
    this.clientsService.searchClientsByFirstNameOrLastName(this.searchText, this.searchLastName).subscribe(clients => {
      console.log('Clients found:', clients); // Ajoutez ce log pour vérifier les données reçues
      this.dataSource = clients;
    });
  }
}
