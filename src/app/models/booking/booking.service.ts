import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Service } from "../service/service.model";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import QueryBuilder from "../../builder/queryBuilder";
import { bookingSearchField } from "./booking.constant";
import { initiatePayment } from "../payment/payment.utilities";
import { TPayment } from "../payment/payment.interface";
import mongoose from "mongoose";

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const customer = await User.findById(payload.customer, {
      session,
    });
    if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isServiceExists = await Service.findById(payload.service, {
      session,
    });
    if (!isServiceExists) {
      throw new AppError(httpStatus.NOT_FOUND, "service not found");
    }

    const isSlotExists = await Slot.findById(payload.slot, {
      session,
    });
    if (!isSlotExists) {
      throw new AppError(httpStatus.NOT_FOUND, "slot not found");
    }

    const isSlotBooked = isSlotExists.isBooked === "booked";

    if (isSlotBooked) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "slot not available at this time"
      );
    }

    const booking = {
      customer: customer._id,
      service: isServiceExists._id,
      slot: isSlotExists._id,
      vehicleType: payload.vehicleType,
      vehicleBrand: payload.vehicleBrand,
      vehicleModel: payload.vehicleModel,
      manufacturingYear: payload.manufacturingYear,
      registrationPlate: payload.registrationPlate,
      amount: payload.amount,
      status: "pending",
      paidStatus: "pending",
      transactionId: payload.transactionId,
    };

    const paymentData: TPayment = {
      transactionId: payload.transactionId,
      amount: payload.amount,
      customer: customer._id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      paidStatus: "paid",
    };
    const payment = await initiatePayment(paymentData);

    if (!payment.success) {
      throw new AppError(httpStatus.BAD_REQUEST, "Payment failed");
    }

    const newBooking = await Booking.create(booking, {
      session,
    });

    await Slot.findByIdAndUpdate(
      payload.slot,
      {
        isBooked: "booked",
      },
      { session }
    );

    const populatedBooking = await Booking.findById(newBooking)
      .populate("customer")
      .populate("service")
      .populate("slot");

    await session.commitTransaction();
    await session.endSession();

    return { booking: populatedBooking, payment };
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Booking creation failed"
    );
  }
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("customer").populate("service").populate("slot"),
    query
  )
    .search(bookingSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bookingQuery.countTotal();
  const result = await bookingQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getCustomerBookingFromDB = async (
  email: string,
  query: Record<string, unknown>
) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({ email })
      .populate("customer")
      .populate("service")
      .populate("slot"),
    query
  )
    .search(bookingSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await bookingQuery.countTotal();
  const result = await bookingQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getCustomerBookingFromDB,
};
