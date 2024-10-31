import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (payload: TReview) => {
  const isUserExists = await User.findById(payload.user);

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async (limit: number) => {
  let result;
  if (limit > 0) {
    result = await Review.find().sort({ createdAt: -1 }).limit(limit);
  } else {
    result = await Review.find().sort({ createdAt: -1 });
  }

  const allReviews = await Review.find();

  //calculate
  const totalRatings = allReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating =
    allReviews.length > 0
      ? (totalRatings / allReviews.length).toFixed(2)
      : "0.00";
  const totalRating = allReviews?.length;

  return {
    result,
    averageRating,
    totalRating,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
