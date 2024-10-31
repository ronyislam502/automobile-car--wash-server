import { Types } from "mongoose";

export type TPayment = {
  customer: Types.ObjectId;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  transactionId: string;
  amount: number;
  paidStatus: string;
};
