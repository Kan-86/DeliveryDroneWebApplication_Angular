import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { OrderService } from '../shared/service/order.service';
import { OrderModel } from '../shared/models/order-model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // Account
  orderFormGroup: FormGroup;
  // Username
  usernameMinLength: number = environment.usernameMinLength;
  usernameMaxLength: number = environment.usernameMaxLength;
  // Password
  passwordMinLength: number = environment.passwordMinLength;
  passwordMaxLength: number = environment.passwordMaxLength;
  orders: OrderModel;
  today: Date;

  constructor(private fb: FormBuilder,
              private router: Router,
              private orderService: OrderService) {
    this.orderFormGroup = new FormGroup({
      orderedItemId: new FormControl(''),
      deliveryAddress: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addOrder(){
    this.today = new Date();
    const orderFormData = this.orderFormGroup.value;
    orderFormData.orderDate = this.today;
    this.orderService.createOrder(orderFormData)
      .subscribe(() => {
        this.router.navigateByUrl('');
      });
  }

}
