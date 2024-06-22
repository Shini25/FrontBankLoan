import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payments } from '../models/payments.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = 'http://localhost:3000/payments'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer tous les paiements
  getAllPayments(): Observable<Payments[]> {
    return this.http.get<Payments[]>(this.apiUrl);
  }

  // Récupérer un paiement par ID
  getPaymentById(id: number): Observable<Payments> {
    return this.http.get<Payments>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau paiement
  addPayment(payment: Payments): Observable<Payments> {
    return this.http.post<Payments>(this.apiUrl, payment);
  }

  // Mettre à jour un paiement
  updatePayment(id: number, payment: Payments): Observable<Payments> {
    return this.http.put<Payments>(`${this.apiUrl}/${id}`, payment);
  }

  // Supprimer un paiement
  deletePayment(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
