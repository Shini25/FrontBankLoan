import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Clients } from '../../models/clients.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [MatTableModule, CommonModule], // Include CommonModule here
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  displayedColumns: string[] = ['clientid', 'firstname', 'lastname', 'email', 'phone', 'address', 'birthdate', 'balance'];
  dataSource: Clients[] = [];

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.dataSource = clients;
    });
  }
}
