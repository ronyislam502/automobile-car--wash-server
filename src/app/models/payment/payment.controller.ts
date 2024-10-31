import { PaymentServices } from "./payment.service";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";

const confirmationController = catchAsync(async (req, res) => {
  const result = await PaymentServices.confirmationService(
    req.query.transactionId as string,
    req.query.status as string,
    req.query.paidStatus as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment successfully",
    data: result,
  });
});

export const PaymentController = {
  confirmationController,
};
