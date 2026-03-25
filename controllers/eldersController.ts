import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checksPermission.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Department from "../models/Department.js";
import cloudinary from "cloudinary";
import Elders from "../models/Elders.js";

const createElder = async (req: any, res: any) => {
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
const getAllElders = async (req: any, res: any) => {
  const elders = await Elders.find({});

  res.status(StatusCodes.OK).json({ elders });
};

const deleteElder = async (req: any, res: any) => {
  const { id: elderId } = req.params;
  const elders = await Elders.findOne({ _id: elderId });
  if (!elders) {
    throw new NotFoundError(`No elder with id ${elderId}`);
  }
  await elders.deleteOne();
  res.send("position deleted");
};

export { createElder, getAllElders, deleteElder };
