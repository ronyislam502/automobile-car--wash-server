import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isUserExists = await User.findById(payload.user.id);

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await (await Review.create(payload)).populate('user');
  return result;
};

const getAllReviewsFromDB = async (limit: number) => {
  let reviews;
  if (limit > 0) {
    reviews = await Review.find()
      .populate('user')
      .sort({ createdAt: -1 })
      .limit(limit);
  } else {
    reviews = await Review.find().populate('user').sort({ createdAt: -1 });
  }

  //calculate
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? (totalRatings / reviews.length).toFixed(2) : '0.00';

  return {
    reviews,
    averageRating,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
