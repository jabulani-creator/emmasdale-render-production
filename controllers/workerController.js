import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Workers from "../models/Workers.js";

const createWorker = async (req, res) => {
  const { name, position, phone, email } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!name || !position || !phone || !email) {
    throw new BadRequestError("Please Provide All Values");
  }

  const workers = await Workers.create({
    name,
    position,
    phone,
    email,
    photo: result.secure_url,
    cloudinary_id: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ workers });
};
const getAllWorkers = async (req, res) => {
  const workers = await Workers.find({});

  res.status(StatusCodes.OK).json({ workers });
};

const deleteWorker = async (req, res) => {
  const { id: workerId } = req.params;
  const workers = Workers.findOne({ _id: workerId });
  if (!workers) {
    throw new CustomError.NotFoundError(`No worker with id ${workerId}`);
  }
  await worker.remove();
  res.send("worker deleted");
};

export { createWorker, getAllWorkers, deleteWorker };
