import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.ts";
import cloudinary from "cloudinary";
import Resource from "../models/Resource.js";

const createResource = async (req: any, res: any) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

  const resources = await Resource.create({
    title: req.body.title,
    description: req.body.description,
    pdf: result.secure_url,
    cloudinary_id_pdf: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ resources });
};

const getResources = async (req: any, res: any) => {
  const resources = await Resource.find({});

  res.status(StatusCodes.OK).json({ resources });
};
const getResource = async (req: any, res: any) => {
  const { id: resourceId } = req.params;
  const resources = await Resource.findById({ _id: resourceId });
  if (!resources) {
    throw new NotFoundError(`No Resource with id ${resourceId}`);
  }

  res.status(StatusCodes.OK).json(resources);
};

export { getResource, getResources, createResource };
