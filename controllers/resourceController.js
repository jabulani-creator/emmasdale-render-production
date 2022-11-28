import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";
import Resource from "../models/Resource.js";

const createResource = async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  const resources = await Resource.create({
    title: req.body.title,
    description: req.body.description,
    pdf: result.secure_url,
    cloudinary_id_pdf: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ resources });
};

const getResources = async (req, res) => {
  const resources = await Resource.find({});

  res.status(StatusCodes.OK).json({ resources });
};
const getResource = async (req, res) => {
  const { id: resourceId } = req.params;
  const resources = await Resource.findById({ _id: resourceId });
  if (!resources) {
    throw new NotFoundError(`No Resource with id ${resourceId}`);
  }

  res.status(StatusCodes.OK).json(resources);
};

export { getResource, getResources, createResource };
