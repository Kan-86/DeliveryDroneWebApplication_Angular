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

  constructor(private fb: FormBuilder,
              private router: Router,
              private orderService: OrderService) {
    this.orderFormGroup = new FormGroup({
      order: new FormControl(''),
      address: new FormControl('')
    });
  }

  ngOnInit(): void {
    // different validater for fields
    this.orderFormGroup = this.fb.group({
      order: ['', ],
      address: ['', ]
    });
  }

  addOrder(){
    const orderFormData = this.orderFormGroup.value;
    this.orders = orderFormData;
    this.orderService.createOrder(orderFormData)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

    console.log('This is the name: ' + orderFormData.order);
  }

}
