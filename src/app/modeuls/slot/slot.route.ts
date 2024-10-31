import express from "express";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

router.post("/create-slot", SlotControllers.createSlot);

router.get("/", SlotControllers.getAllSlots);

router.get("/availability", SlotControllers.getAvailableSlots);

router.put("/update/:id", SlotControllers.updateSlot);

export const SlotRoutes = router;
