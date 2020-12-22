import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { DroneModel } from '../shared/models/drone-model';
import { NavbarComponent } from '../navbar/navbar.component';
import { DroneService } from '../shared/service/drone.service';
import {OrderModel} from "../shared/models/order-model";
import {OrderService} from "../shared/service/order.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private map;
  droneLat: number;
  droneLong: number;
  deliveryLat: number;
  deliveryLong: number;
  drones: DroneModel[];
  orders: OrderModel[];
  droneId: number;
  selectedDrones: string;
  droneMarker = null;
  deliveryMarker = null;
  polyline = null;
  constructor(private droneService: DroneService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.droneService.getDrones().subscribe(s => {
      this.drones = s;
    });
    this.orderService.getOrder().subscribe(o => {
      this.orders = o;
    });
    this.initMap();
  }

  onSelectedChange(value: number): void{
    this.droneId = value;
    this.drones.forEach(d => {
      if (d.droneId === this.droneId){
        this.droneLong = d.long;
        this.droneLat = d.lat;
      }
    });
    this.orders.forEach(o => {
      if (o.assignedDroneId === this.droneId){
        this.deliveryLong = o.deliveryAddressLong;
        this.deliveryLat = o.deliveryAddressLat;
      }
    });
    const droneIcon = L.icon({
      iconUrl: 'assets/img/droneIcon.png',

      iconSize:     [28, 28], // size of the icon
    });
    const deliveryIcon = L.icon({
      iconUrl: 'assets/img/mailbox.png',

      iconSize:     [28, 28], // size of the icon
    });
    if (this.droneMarker !== null) {
      this.map.removeLayer(this.droneMarker);
      this.map.removeLayer(this.deliveryMarker);
      this.map.removeLayer(this.polyline);
    }
    this.droneMarker = new L.marker([this.droneLat,   this.droneLong], {icon: droneIcon}).addTo(this.map);
    this.deliveryMarker = new L.marker([this.deliveryLat,   this.deliveryLong], {icon: deliveryIcon}).addTo(this.map);

    const latlngs = Array();

    // Get latlng from first marker
    latlngs.push(this.droneMarker.getLatLng());

    // Get latlng from first marker
    latlngs.push(this.deliveryMarker.getLatLng());

    // You can just keep adding markers

    // From documentation http://leafletjs.com/reference.html#polyline
    // create a red polyline from an arrays of LatLng points
    this.polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);

    // zoom the map to the polyline
    this.map.fitBounds(this.polyline.getBounds());
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 55.48775590896692, 8.446953715343545 ],
      zoom: 12
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    tiles.addTo(this.map);
    L.bringToBack();
  }
}
