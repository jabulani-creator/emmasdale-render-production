import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Workers from "../models/Workers.js";

const createWorker = async (req: any, res: any) => {
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
const getAllWorkers = async (req: any, res: any) => {
  const workers = await Workers.find({});

  res.status(StatusCodes.OK).json({ workers });
};

const deleteWorker = async (req: any, res: any) => {
  const { id: workerId } = req.params;
  const workers = await Workers.findOne({ _id: workerId });
  if (!workers) {
    throw new NotFoundError(`No worker with id ${workerId}`);
  }
  await workers.deleteOne();
  res.send("worker deleted");
};

export { createWorker, getAllWorkers, deleteWorker };
