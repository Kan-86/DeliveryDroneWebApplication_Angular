export interface OrderModel{
  orderId: number,
  assignedDroneId: number,
  orderedItemId: number,
  orderDate: Date,
  deliveryAddress: string,
  deliveryAddressLat: string,
  deliveryAddressLong: string,
  pickupLocation: string,
  pickupLocationLat: string,
  pickupLocationLong: string
}
