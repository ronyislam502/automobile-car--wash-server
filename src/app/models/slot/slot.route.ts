import express from 'express';
import { SlotControllers } from './slot.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';

const router = express.Router();

router.post(
  '/create-slot',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);

router.get('/', SlotControllers.getAllSlots);

router.get('/availability', SlotControllers.getAvailableSlots);

router.patch(
  '/update/:id',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.updateSlotValidationSchema),
  SlotControllers.updateSlot,
);

export const SlotRoutes = router;
