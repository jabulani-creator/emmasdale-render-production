import Leader from "../models/Pastors.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checksPermission.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Department from "../models/Department.js";
import cloudinary from "cloudinary";

const createPosition = async (req, res) => {
  const { name, position, phone, email } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!name || !position || !phone || !email) {
    throw new BadRequestError("Please Provide All Values");
  }

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
const getAllPosition = async (req, res) => {
  const leaders = await Department.find({});

  res.status(StatusCodes.OK).json({ leaders });
};

const deletePosition = async (req, res) => {
  const { id: positonId } = req.params;
  const leaders = Department.findOne({ _id: positonId });
  if (!leaders) {
    throw new CustomError.NotFoundError(`No leader with id ${positonId}`);
  }
  await leaders.remove();
  res.send("position deleted");
};

export { createPosition, getAllPosition, deletePosition };
