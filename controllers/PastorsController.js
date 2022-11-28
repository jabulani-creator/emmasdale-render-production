import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Pastors from "../models/Pastors.js";

const createPastor = async (req, res) => {
  const { name, position, phone, email } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!name || !position || !phone || !email) {
    throw new BadRequestError("Please Provide All Values");
  }

  const pastors = await Pastors.create({
    name,
    position,
    phone,
    email,
    photo: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ pastors });
};
const getPastor = async (req, res) => {
  const pastors = await Pastors.find({});

  res.status(StatusCodes.OK).json({ pastors });
};

const deletePastor = async (req, res) => {
  const { id: pastorId } = req.params;
  const pastors = Pastors.findOne({ _id: pastorId });
  if (!pastors) {
    throw new CustomError.NotFoundError(`No pastor with id ${pastorId}`);
  }
  await pastors.remove();
  res.send("pastor deleted");
};

export { createPastor, getPastor, deletePastor };
