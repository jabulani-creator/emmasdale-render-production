import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Pastors from "../models/Pastors.js";

const createPastor = async (req: any, res: any) => {
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
const getPastor = async (req: any, res: any) => {
  const pastors = await Pastors.find({});

  res.status(StatusCodes.OK).json({ pastors });
};

const deletePastor = async (req: any, res: any) => {
  const { id: pastorId } = req.params;
  const pastors = await Pastors.findOne({ _id: pastorId });
  if (!pastors) {
    throw new NotFoundError(`No pastor with id ${pastorId}`);
  }
  await pastors.deleteOne();
  res.send("pastor deleted");
};

export { createPastor, getPastor, deletePastor };
