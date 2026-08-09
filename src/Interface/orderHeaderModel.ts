import { stateModel } from "./stateModel"

export interface OrderHeaderModel {
   id: number
  createdBy: string
  applicationUser: any
  orderDate: string
  shippingDate: string
  finalOrderTotal: number
  orderStatus: string
  paymentDate: string
  transactionId: string
  phoneNumber: string
  streetAddress: string
  city: string
  stateId: number
  state: stateModel
  postalCode: string
  fullName: string
  email: string
}