import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot created Successfully",
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Slots retrieved successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAvailableSlotsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Slots retrieved successfully",
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.updateSlotIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Slots retrieved successfully",
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
  getAvailableSlots,
  updateSlot,
};
