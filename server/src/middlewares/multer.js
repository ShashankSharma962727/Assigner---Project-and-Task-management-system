const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../../public/temp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;