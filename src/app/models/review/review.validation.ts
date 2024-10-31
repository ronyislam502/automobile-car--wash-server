import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    comment: z.string(),
    rating: z.number(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
