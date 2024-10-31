import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  transactionId: {
    type: String,
    required: true,
  },
  paidStatus: {
    type: String,
    required: true,
    default: "paid",
  },
});
export const Payment = model<TPayment>("Payment", paymentSchema);
