export interface OrderModel{
  orderId: string;
  assignedDroneId: string;
  orderedItemId: number;
  orderDate: Date;
  deliveryAddress: string;
  deliveryAddressLat: string;
  deliveryAddressLong: string;
  pickupLocation: string;
  pickupLocationLat: number;
  pickupLocationLong: number;
}
