import Leader from "../models/Pastors.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checksPermission.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Department from "../models/Department.js";
import cloudinary from "cloudinary";

const createPosition = async (req: any, res: any) => {
  const { name, position, phone, email } = req.body;
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

  const leaders = await Department.create({
    name,
    position,
    phone,
    email,
    photo: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ leaders });
};
const getAllPosition = async (req: any, res: any) => {
  const leaders = await Department.find({});

  res.status(StatusCodes.OK).json({ leaders });
};

const deletePosition = async (req: any, res: any) => {
  const { id: positonId } = req.params;
  const leaders = await Department.findOne({ _id: positonId });
  if (!leaders) {
    throw new NotFoundError(`No leader with id ${positonId}`);
  }
  await leaders.deleteOne();
  res.send("position deleted");
};

export { createPosition, getAllPosition, deletePosition };
