import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

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

const Upload = multer({
  storage,
  fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    checkFileType(file, cb);
  },
});

export default Upload;
