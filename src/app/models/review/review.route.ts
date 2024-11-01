import express from 'express';
import { ReviewControllers } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';

const router = express.Router();

router.post(
  '/create-review',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/', ReviewControllers.getAllReviews);

export const ReviewRoutes = router;
