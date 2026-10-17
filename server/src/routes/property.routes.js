const express = require("express");
const propertyRouter = express.Router();
const {
  listProperty,
  getProperties,
  getOneProperty,
  updateProperty,
  deleteProperty,
  myProperties,
} = require("../controllers/property.controllers.js");
const upload = require("../middlewares/multer.js");
const checkAccessToken = require("../middlewares/checkAccessToken.js");

propertyRouter.post("/", checkAccessToken, upload.single("image"), listProperty);
propertyRouter.get("/", getProperties);
propertyRouter.get("/my-properties", checkAccessToken, myProperties);
propertyRouter.get("/:id", getOneProperty);
propertyRouter.patch("/:id", checkAccessToken, upload.single("image"), updateProperty);
propertyRouter.delete("/:id", checkAccessToken, deleteProperty);

module.exports = propertyRouter;