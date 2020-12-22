export interface OrderModel{
  orderId: number;
  assignedDroneId: number;
  orderedItemId: number;
  orderDate: Date;
  deliveryAddress: string;
  deliveryAddressLat: number;
  deliveryAddressLong: number;
  pickupLocation: string;
  pickupLocationLat: number;
  pickupLocationLong: number;
}
