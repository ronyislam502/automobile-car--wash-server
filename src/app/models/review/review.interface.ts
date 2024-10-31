import { Types } from "mongoose";

export type TReview = {
  user: Types.ObjectId;
  comment: string;
  rating: number;
};
