import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from '../models/employees.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  // Récupérer tous les employés
  getAllEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.apiUrl);
  }

  // Récupérer un employé par username
  getEmployeeByUsername(username: string): Observable<Employees> {
    return this.http.get<Employees>(`${this.apiUrl}/${username}`);
  }

  // Ajouter un nouvel employé
  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.apiUrl, employee);
  }

  // Mettre à jour un employé
  updateEmployee(username: string, employee: Employees): Observable<Employees> {
    return this.http.put<Employees>(`${this.apiUrl}/${username}`, employee);
  }

  // Supprimer un employé
  deleteEmployee(username: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${username}`);
  }
}
