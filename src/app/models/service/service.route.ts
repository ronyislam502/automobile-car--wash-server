import express from 'express';
import { ServiceControllers } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidations } from './service.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post(
  '/create-service',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);

router.get('/', ServiceControllers.getAllServices);

router.get('/service/:id', ServiceControllers.getSingleService);

router.put(
  '/update/:id',
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.admin),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
