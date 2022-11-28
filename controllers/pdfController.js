import PDF from "../models/Pdf.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";

const UploadFile = async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  const upload = await PDF.create({
    name: req.body.name,
    pdf: result.secure_url,
    cloudinary_id_pdf: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ upload });
};

const getPdf = async (req, res) => {
  const upload = await PDF.findOne().sort({ createdAt: -1 }).limit(1);

  res.status(StatusCodes.OK).json(upload);
};

export { getPdf, UploadFile };
