import multer, { FileFilterCallback } from "multer";
import path from "path";
import cloudinary from "cloudinary";

const storage = multer.memoryStorage();

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!") as any);
  }
}

const FileUpload = (file: any, folder: any) => {
  let ext = path.extname(file);
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (result) {
            resolve({
              url: result.url,
              id: result.public_id + ext,
            });
        }
      }
    );
  });
};

export default FileUpload;
