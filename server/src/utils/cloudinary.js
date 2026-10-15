const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (filepath) => {
  try {
    if (!filepath) return null;

    const res = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });

    fs.unlinkSync(filepath);
    return res;
  } catch (error) {
    fs.unlinkSync(filepath);
    return null;
  }
};

module.exports = cloudinaryUpload;
