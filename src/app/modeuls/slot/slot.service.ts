import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { generateSlots } from "./slot.utilities";
import { Slot } from "./slot.model";
import QueryBuilder from "../../builder/queryBuilder";
import { slotSearchField } from "./slot.constant";

const createSlotIntoDB = async (payload: TSlot) => {
  const isService = await Service.findById(payload.service);

  if (!isService) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not Found");
  }

  const serviceDuration = isService.duration;

  if (!serviceDuration) {
    throw new AppError(httpStatus.BAD_REQUEST, "Service duration not defined");
  }

  const slots = generateSlots(
    payload.startTime,
    payload.endTime,
    serviceDuration
  );

  const slotsDoc = slots.map((slot) => ({
    service: payload?.service,
    date: payload?.date,
    startTime: slot?.startTime,
    endTime: slot?.endTime,
    isBooked: payload?.isBooked,
  }));

  const result = await Slot.create(slotsDoc);
  return result;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const slotQuery = new QueryBuilder(Slot.find().populate("service"), query)
    .search(slotSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await slotQuery.countTotal();
  const result = await slotQuery.modelQuery;
  return {
    meta,
    result,
  };
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const searchField = ["name", "date", "service", "serviceId"];

  const slotQuery = new QueryBuilder(
    Slot.find({ isBooked: { $ne: "booked" } }).populate("service"),
    query
  )
    .search(searchField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await slotQuery.modelQuery;

  return result;
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const isSlotExists = await Slot.findById(payload);
  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  const isBooked = isSlotExists.isBooked === "booked";
  if (isBooked) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is booked at this time");
  }

  const result = await Slot.findByIdAndUpdate(id, payload);
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
  getAvailableSlotsFromDB,
  updateSlotIntoDB,
};
