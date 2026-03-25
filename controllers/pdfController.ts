import PDF from "../models/Pdf.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import cloudinary from "cloudinary";

const UploadFile = async (req: any, res: any) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

  const upload = await PDF.create({
    name: req.body.name,
    pdf: result.secure_url,
    cloudinary_id_pdf: result.public_id,
  });
  res.status(StatusCodes.CREATED).json({ upload });
};

const getPdf = async (req: any, res: any) => {
  const upload = await PDF.findOne().sort({ createdAt: -1 }).limit(1);

  res.status(StatusCodes.OK).json({ upload });
};

export { getPdf, UploadFile };
