import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { OrderService } from '../shared/service/order.service';
import { OrderModel } from '../shared/models/order-model';
import { DroneModel } from '../shared/models/drone-model';
import { DroneService } from '../shared/service/drone.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // Account
  orderFormGroup: FormGroup;
  orders: OrderModel;
  drone: DroneModel;
  today: Date;
  carryingOrder: boolean;
  droneId: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private droneService: DroneService) {
    this.orderFormGroup = new FormGroup({
      orderedItemId: new FormControl(''),
      deliveryAddress: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.droneService.getDrones().subscribe(s => {
      s.forEach(ord => {
        if (!ord.carryingOrder){
          this.droneId = ord.droneId;
        }
      });
    });
  }

  addOrder(): void{
    this.today = new Date();
    const orderFormData = this.orderFormGroup.value;
    orderFormData.orderDate = this.today;
    orderFormData.assignedDroneId = this.droneId;

    this.orderService.createOrder(orderFormData)
      .subscribe(() => {
        this.router.navigateByUrl('');
      });
  }

  getOrder(): void{
    this.orderService.getOrder().subscribe(orders => {
      orders.forEach(ord => {
        console.log(ord.deliveryAddress);
      });
    });
  }
}
