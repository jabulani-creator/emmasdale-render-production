import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Review from "../models/Review.js";

const createReview = async (req: any, res: any) => {
  const { ReviewName, ReviewDesc } = req.body;
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

  const reviews = await Review.create({
    ReviewName,
    ReviewDesc,
    ReviewPhoto: result.secure_url,
    cloudinary_id: result.public_id,
  });

  res.status(StatusCodes.CREATED).json({ reviews });
};
const deleteReview = async (req: any, res: any) => {
  const { id: reviewId } = req.params;

  const reviews = await Review.findOne({ _id: reviewId });

  if (!reviews) {
    throw new NotFoundError(`No Review with id ${reviewId}`);
  }

  await reviews.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Review removed" });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews });
};

const getReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const reviews = await Review.findById({ _id: reviewId });
  if (!reviews) {
    throw new NotFoundError(`No Review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json(reviews);
};

export { createReview, deleteReview, getAllReviews, getReview };
