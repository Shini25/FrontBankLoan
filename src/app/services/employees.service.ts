import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': token || ''
    });
  }

  // Récupérer tous les employés
  getAllEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer un employé par username
  getEmployeeByUsername(username: string): Observable<Employees> {
    return this.http.get<Employees>(`${this.apiUrl}/${username}`, { headers: this.getAuthHeaders() });
  }

  // Ajouter un nouvel employé
  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.apiUrl, employee, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un employé
  updateEmployee(employee: Employees): Observable<Employees> {
    return this.http.put<Employees>(`${this.apiUrl}/${employee.username}`, employee, { headers: this.getAuthHeaders() });
  }

  // Supprimer un employé
  deleteEmployee(username: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${username}`, { headers: this.getAuthHeaders() });
  }

  // Rechercher des employés par prénom ou nom de famille
  searchEmployeesByFirstNameOrLastName(searchText: string): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${this.apiUrl}/search?searchText=${searchText}`, { headers: this.getAuthHeaders() });
  }
}
