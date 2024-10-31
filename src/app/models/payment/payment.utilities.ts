import axios from "axios";
import dotenv from "dotenv";
import config from "../../config";
import { TPayment } from "./payment.interface";

dotenv.config();

export const initiatePayment = async (payload: TPayment) => {
  const res = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    tran_id: paymentData.transactionId,
    success_url: `${config.live_url}/api/payment/confirmation?transactionId=${payload.transactionId}&status=success&paidStatus=${payload.paidStatus}`,
    fail_url: `${config.live_url}/api/payment/confirmation?status=failed`,
    cancel_url: config.client_url,
    amount: payload.amount,
    currency: "BDT",
    signature_key: config.signature_key,
    desc: "Merchant Registration Payment",
    cus_name: payload.customerName,
    cus_email: payload.customerEmail,
    cus_add1: payload.customerAddress,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: payload.customerPhone,
    type: "json",
  });

  return res.data;
};

export const verifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_verify_url!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_key,
      type: "json",
      request_id: transactionId,
    },
  });
  return response.data;
};
