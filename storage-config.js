const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
    //cb(null, `${originalname}`);
  },
});
const upload = multer({ storage }); // or simply { dest: 'uploads/' }

module.exports = upload;