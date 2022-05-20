import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/shared/interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl: string = 'http://localhost:8080/api/departments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}`);
  }
}
