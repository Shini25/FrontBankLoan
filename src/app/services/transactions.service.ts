import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'http://localhost:3000/transactions'; // URL de l'API

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  // Récupérer toutes les transactions
  getAllTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer une transaction par ID
  getTransactionById(id: number): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Ajouter une nouvelle transaction
  addTransaction(transaction: Transactions): Observable<Transactions> {
    return this.http.post<Transactions>(this.apiUrl, transaction, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour une transaction
  updateTransaction(id: number, transaction: Transactions): Observable<Transactions> {
    return this.http.put<Transactions>(`${this.apiUrl}/${id}`, transaction, { headers: this.getAuthHeaders() });
  }

  // Supprimer une transaction
  deleteTransaction(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
