import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { DroneModel } from '../shared/models/drone-model';
import { DroneService } from '../shared/service/drone.service';
import {OrderModel} from '../shared/models/order-model';
import {OrderService} from '../shared/service/order.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogDataComponent} from '../dialog-data/dialog-data.component';
import {Observable} from 'rxjs';
import { timer } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private map;
  droneLat: string;
  droneLong: string;
  deliveryLat: string;
  deliveryLong: string;
  drones: DroneModel[] = [];
  orders: OrderModel[] = [];
  drone: DroneModel;
  order: OrderModel;
  droneId: string;
  selectedDrones: string;
  droneMarker = null;
  deliveryMarker = null;
  polyline = null;
  droneIcon = null;
  deliveryIcon = null;
  carryingOrder: boolean;
  ticks = 0;

  constructor(private droneService: DroneService,
              private orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    /*this.droneService.getDrones().subscribe(s => {
      this.drones = s;
    });*/
    this.orderService.getOrder().subscribe(o => {
      this.orders = o;
    });
    this.subscribeToDroneFromBroker();
    this.initMap();
    this.stateChange();
  }

  stateChange(): void {
    setTimeout(() => {
      console.log('sleep');
      if (this.drone !== null){
        this.updateDroneOrderCoords();
      }
    }, 1500);
  }

  updateDroneOrderCoords(): void {
    const drone = this.droneLiveCoords();
    this.drones.push(drone);
  }
  assignLatLongValues(d: any): void{

    // Assign the lat and long values so we can use it later
    /**
     * This is all fine and good, but for the current test setup it wont work
     * This assumes that multiple drones are working at the same time
     * As well as the proper -- Order -> Delivery -> Destination --
     * System is fully implemented, which it isn't in this prototype.
     */
    /*
    this.drones.forEach(d => {
      if (d.droneId === this.droneId){
        this.droneLong = d.long;
        this.droneLat = d.lat;
        this.carryingOrder = d.carryingOrder;
        this.deliveryLat = d.destinationLat;
        this.deliveryLong = d.destinationLong;
      }
    });

    this.orders.forEach(o => {
      if (o.assignedDroneId.toString() === this.droneId){
        console.log(this.deliveryLong);
        // this.deliveryLong = o.deliveryAddressLong.toString();
        // this.deliveryLat = o.deliveryAddressLat.toString();
      }
      this.deliveryLong = o.deliveryAddressLong;
      this.deliveryLat = o.deliveryAddressLat;
    });*/

    this.droneLat = d.droneLat;
    this.droneLong = d.droneLong;
    this.carryingOrder = d.droneOrderId;
    this.deliveryLat = d.droneDestinationLat;
    this.deliveryLong = d.droneDestinationLong;
  }

  updateRealTime(): void {
    if (this.drones != null) {
      interval(3000).subscribe(() =>
        this.assignLatLongValues(this.droneLiveCoords())
      );
      interval(1000).subscribe(() =>
        this.addMarkerToMap()
      );
    }
  }

  createMarkerIcons(): void{
    // We use the images for custom marker
    this.droneIcon = L.icon({
      iconUrl: 'assets/img/droneIcon.png',
      iconSize:     [34, 34], // size of the icon
    });
    this.deliveryIcon = L.icon({
      iconUrl: 'assets/img/mailbox.png',
      iconSize:     [34, 34], // size of the icon
    });
  }
  onSelectedChange(value: string): void{
    // Get the id of the selected drone
    this.droneId = value;

    const drone = this.getTheLiveCoordsFromBroker();
    // use the order and drone location to
    // assign values to lat long variables
    this.assignLatLongValues(drone);
    // use image from asset to create the marker icon
    this.createMarkerIcons();
    // add the markers to the map using the lat long variables
    this.addMarkerToMap();

    // Live update
    this.updateRealTime();
  }

  private addMarkerToMap(): void{
    // Make sure we remove the markers that we have added
    // if there is already a marker on the map
    if (this.droneMarker !== null && this.deliveryMarker !== null) {
      this.map.removeLayer(this.droneMarker);
      this.map.removeLayer(this.deliveryMarker);
      this.map.removeLayer(this.polyline);
    }

    if (this.carryingOrder){
      // Add the drone and deliveryAddress markers
      this.droneMarker = new L.marker([this.droneLat,   this.droneLong], {icon: this.droneIcon}).addTo(this.map);
      this.deliveryMarker = new L.marker([this.deliveryLat, this.deliveryLong], {icon: this.deliveryIcon}).addTo(this.map);
      // We want to compare the locations of drone and delivery address
      // and draw a line between them


      this.drawPolyLine();
    }
    else{
      this.openDialog();
    }
  }

  private drawPolyLine(): void{
    const latLong = Array();
    // Get latLong from first marker
    latLong.push(this.droneMarker.getLatLng());
    // Get latLong from first marker
    latLong.push(this.deliveryMarker.getLatLng());
    // You can just keep adding markers
    // create a red polyline from an arrays of LatLng points
    this.polyline = L.polyline(latLong, {color: 'red'}).addTo(this.map);
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
  }

  openDialog(): void {
    this.dialog.open(DialogDataComponent, {
      data: {
        info: 'This drone is not carrying an order.'
      }
    });
  }

  getTheLiveCoordsFromBroker(): any {
    const currentDrone = this.droneService.getLiveDroneFromBroker();
    return currentDrone;
  }
  subscribeToDroneFromBroker(): void{
    this.droneService.initializeSubscribeToDroneTopic();
  }

  droneLiveCoords(): DroneModel {
    this.drone = this.droneService.getLiveDroneFromBroker();
    return this.drone;
  }
}
