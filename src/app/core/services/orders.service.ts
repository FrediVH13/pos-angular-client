import { Observable } from 'rxjs';
import { Order } from './../../shared/interfaces/order';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  API_URL = environment.apiUrl + '/orders';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.API_URL);
  }

  new(data: any): Observable<Order> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post<Order>(this.API_URL, body, {
      headers: this.headers,
    });
  }
}
