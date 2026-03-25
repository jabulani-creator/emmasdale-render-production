import Images from "../models/Gallery.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";

const uploadImage = async (req: any, res: any) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;
  const image = await Images.create({
    department: req.body.department,
    image: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ image });
};

const getImage = async (req: any, res: any) => {
  const { department, search } = req.query;

  const queryObject: any = {};

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
