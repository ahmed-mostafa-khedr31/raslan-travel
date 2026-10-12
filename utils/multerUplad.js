const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split(".")[1];
    fileName = Date.now() + "." + fileExtension;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = file.mimetype.split("/")[0];
  if (allowedTypes !== "image") {
    return cb(new Error("Invalid file type"), false);
  }
  return cb(null, true);
};
const multerUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter,
});
module.exports = multerUpload;
