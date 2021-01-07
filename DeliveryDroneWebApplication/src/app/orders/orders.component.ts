import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../shared/service/order.service';
import { OrderModel } from '../shared/models/order-model';
import { DroneModel } from '../shared/models/drone-model';
import { DroneService } from '../shared/service/drone.service';
import {delay} from 'rxjs/operators';

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
  orderLat: number;
  orderLong: number;
  today: Date;
  carryingOrder: boolean;
  droneId: string;
  result: any = [];
  orderFormData: any;
  constructor(private fb: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private droneService: DroneService) {
    this.orderFormGroup = new FormGroup({
      orderedItemId: new FormControl(''),
      deliveryAddress: new FormControl(''),
      deliveryAddressNumber: new FormControl(''),
      deliveryZip: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.findAvailableDrone();
  }

  private findAvailableDrone(): void{
    /*this.droneService.getDrones().subscribe(s => {
      let count = 0; /* Just want to assign one drone
      s.forEach(ord => {
        if (!ord.carryingOrder && count > 0){
          count++;
          this.droneId = ord.droneId;
          ord.carryingOrder = true;
          this.droneService.updateDrone(ord);
        }
      });
    });*/
    const drone = this.droneService.getLiveDroneFromBroker();
    if (drone != null){
      this.droneId = drone.droneId;
      drone.carryingOrder = true;
      this.droneService.updateDrone(drone);
    }
  }

  async addOrder(): Promise<void>{
    this.findAvailableDrone();
    this.today = new Date();
    this.orderFormData = this.orderFormGroup.value;
    await this.orderService.getLocation(this.orderFormData.deliveryAddress,
      this.orderFormData.deliveryAddressNumber,
      this.orderFormData.deliveryZip)
      .subscribe(s => {
      s.forEach(d => {
        this.orderLat = d.lat;
        this.orderLong = d.lon;

        this.orderFormData.deliveryAddress = this.orderFormData.deliveryAddress
          + ' ' + this.orderFormData.deliveryAddressNumber
          + ' ' + this.orderFormData.deliveryZip;
        this.orderFormData.orderDate = this.today;
        this.orderFormData.assignedDroneId = this.droneId;
        this.orderFormData.deliveryAddressLong = this.orderLong;
        this.orderFormData.deliveryAddressLat = this.orderLat;

        this.orderService.createOrder(this.orderFormData).subscribe(() => {
          this.router.navigateByUrl('');
        });
      });
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
