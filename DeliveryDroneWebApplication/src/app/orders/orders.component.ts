import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order-model';
import { Router } from '@angular/router';

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
              private router: Router,) {
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
    console.log('This is the name: ' + orderFormData.order);
  }

}
