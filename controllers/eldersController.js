import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checksPermission.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Department from "../models/Department.js";
import cloudinary from "cloudinary";
import Elders from "../models/Elders.js";

const createElder = async (req, res) => {
  const { name, position, phone, email } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!name || !position || !phone || !email) {
    throw new BadRequestError("Please Provide All Values");
  }

  const elders = await Elders.create({
    name,
    position,
    phone,
    email,
    photo: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ elders });
};
const getAllElders = async (req, res) => {
  const elders = await Elders.find({});

  res.status(StatusCodes.OK).json({ elders });
};

const deleteElder = async (req, res) => {
  const { id: elderId } = req.params;
  const elders = Elders.findOne({ _id: elderId });
  if (!elders) {
    throw new CustomError.NotFoundError(`No elder with id ${elderId}`);
  }
  await elders.remove();
  res.send("position deleted");
};

export { createElder, getAllElders, deleteElder };
