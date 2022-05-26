import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  API_URL = environment.apiUrl + '/products';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  new(data: Product): Observable<Product> {
    const body = JSON.stringify(data);
    return this.http.post<Product>(this.API_URL, body, {
      headers: this.headers,
    });
  }

  update(data: Product, id: string): Observable<Product> {
    const body = JSON.stringify(data);
    return this.http.put<Product>(`${this.API_URL}/${id}`, body, {
      headers: this.headers,
    });
  }
}
