import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import QueryBuilder from "../../builder/queryBuilder";

const createReviewIntoDB = async (payload: TReview) => {
  const isUserExists = await User.findById(payload.user);

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(Review.find().populate("user"), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await reviewQuery.countTotal();
  const result = await reviewQuery.modelQuery;

  return {
    meta,
    result,
  };
};

export const ReviewServices = {
  createReviewIntoDB,
};
