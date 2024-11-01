import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';
import QueryBuilder from '../../builder/queryBuilder';
import { bookingSearchField } from './booking.constant';

const createBookingIntoDB = async (payload: TBooking) => {
  const customer = await User.findById(payload.customer);

  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isServiceExists = await Service.findById(payload.service);
  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'service not found');
  }

  const isSlotExists = await Slot.findById(payload.slot);
  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'slot not found');
  }

  const isSlotBooked = isSlotExists.isBooked === 'booked';

  if (isSlotBooked) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'slot not available at this time',
    );
  }

  const result = await Booking.create(payload);

  await Slot.findByIdAndUpdate(isSlotExists, {
    isBooked: 'booked',
  });

  return result;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate('customer').populate('service').populate('slot'),
    query,
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
  query: Record<string, unknown>,
) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({ email })
      .populate('customer')
      .populate('service')
      .populate('slot'),
    query,
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
