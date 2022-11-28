import Health from "../models/Health.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";
import cloudinary from "cloudinary";

const createHealthPost = async (req, res) => {
  const { healthTitle, healthDesc } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!healthTitle || !healthDesc) {
    throw new BadRequestError("Please Provide all Values");
  }
  const titleAlreadyExists = await Health.findOne({ healthTitle });
  if (titleAlreadyExists) {
    throw new BadRequestError("title already exists");
  }

  const health = await Health.create({
    healthTitle,
    healthDesc,
    healthPhoto: result.secure_url,
    cloudinary_id: result.public_id,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ health });
};
const deleteHealthPost = async (req, res) => {
  const { id: healthPostId } = req.params;

  const healthPost = await Health.findOne({ _id: healthPostId });

  if (!healthPost) {
    throw new CustomError.NotFoundError(
      `NO health tip with id: ${healthPostId}`
    );
  }

  checkPermission(req.user, healthPost.createdBy);
  await healthPost.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! health Tip removed" });
};
const getAllHealthPosts = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.healthTitle = { $regex: search, $options: "i" };
  }

  let result = Health.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("healthTitle");
  }
  if (sort === "z-a") {
    result = result.sort("-healthTitle");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const healthPosts = await result;

  const totalHealthPost = await Health.countDocuments(queryObject);
  const numOfHealthPages = Math.ceil(totalHealthPost / limit);

  res
    .status(StatusCodes.OK)
    .json({ healthPosts, totalHealthPost, numOfHealthPages });
};
const updateHealthPost = async (req, res) => {
  const { id: healthPostId } = req.params;

  const { healthTitle, healthDesc } = req.body;

  if (!healthTitle || !healthDesc) {
    throw new BadRequestError("Please Provide All Values");
  }

  const healthPost = await Health.findOne({ _id: healthPostId });

  if (!healthPost) {
    throw new NotFoundError(`No health Tip with id ${healthPostId}`);
  }

  checkPermission(req.user, healthPost.createdBy);
  const updatedHealthPost = await Health.findOneAndUpdate(
    { _id: healthPostId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedHealthPost });
};
const getHealthPost = async (req, res) => {
  const { id: healthPostId } = req.params;
  const health = await Health.findById({ _id: healthPostId });
  if (!health) {
    throw new NotFoundError(`No Health post with id ${healthPostId}`);
  }
  res.status(StatusCodes.CREATED).json(health);
};

export {
  createHealthPost,
  deleteHealthPost,
  getAllHealthPosts,
  updateHealthPost,
  getHealthPost,
};
