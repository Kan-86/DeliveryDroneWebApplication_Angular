import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = 'https://localhost:44395/api/v1/order';
  constructor(private http: HttpClient) { }

  createOrder(orderFormData: OrderModel){
      return this.http.post<OrderModel>(this.apiUrl, orderFormData);
  }

  getOrder() : Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(this.apiUrl);
  }
}
