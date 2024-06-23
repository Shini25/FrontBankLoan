import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:3000/clients'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer tous les clients
  getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.apiUrl);
  }

  // Récupérer un client par ID
  getClientById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau client
  addClient(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.apiUrl, client);
  }

  // Mettre à jour un client
  updateClient(client: Clients): Observable<Clients> {
    return this.http.put<Clients>(`${this.apiUrl}/${client.clientid}`, client);
  }

  // Supprimer un client
  deleteClient(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Rechercher des clients par prénom ou nom de famille
  searchClientsByFirstNameOrLastName(firstname?: string, lastname?: string): Observable<Clients[]> {
    let query = `${this.apiUrl}/search?`;
    if (firstname) {
      query += `firstname=${firstname}&`;
    }
    if (lastname) {
      query += `lastname=${lastname}`;
    }
    return this.http.get<Clients[]>(query);
  }
}
