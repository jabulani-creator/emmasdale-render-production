import Images from "../models/Gallery.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

const uploadImage = async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });
  const image = await Images.create({
    department: req.body.department,
    image: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ image });
};

const getImage = async (req, res) => {
  const { department, search } = req.query;

  const queryObject = {};

  if (department && department !== "all") {
    queryObject.department = department;
  }
  if (search) {
    queryObject.department = { $regex: search, $options: "i" };
  }
  let result = Images.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const images = await result;
  const totalImages = await Images.countDocuments(queryObject);
  const numOfImagePages = Math.ceil(totalImages / limit);

  res.status(StatusCodes.OK).json({ images, totalImages, numOfImagePages });
};

export { uploadImage, getImage };
