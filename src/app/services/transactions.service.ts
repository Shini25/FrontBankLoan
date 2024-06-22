import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'http://localhost:3000/transactions'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les transactions
  getAllTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.apiUrl);
  }

  // Récupérer une transaction par ID
  getTransactionById(id: number): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une nouvelle transaction
  addTransaction(transaction: Transactions): Observable<Transactions> {
    return this.http.post<Transactions>(this.apiUrl, transaction);
  }

  // Mettre à jour une transaction
  updateTransaction(id: number, transaction: Transactions): Observable<Transactions> {
    return this.http.put<Transactions>(`${this.apiUrl}/${id}`, transaction);
  }

  // Supprimer une transaction
  deleteTransaction(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
