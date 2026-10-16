const express = require("express");
const propertyRouter = express.Router();
const {
  listProperty,
  getProperties,
  getOneProperty,
  updateProperty,
  deleteProperty,
  myProperties,
  PropertyStatus,
} = require("../controllers/property.controllers.js");
const upload = require("../middlewares/multer.js");
const checkAccessToken = require("../middlewares/checkAccessToken.js");

propertyRouter.post("/",checkAccessToken, upload.single('image'), listProperty);
propertyRouter.get("/", getProperties);
propertyRouter.get("/my-properties",checkAccessToken, myProperties);
propertyRouter.post("/status", PropertyStatus);
propertyRouter.get("/:id", getOneProperty);
propertyRouter.patch("/:id",checkAccessToken, upload.single('image'), updateProperty);
propertyRouter.delete("/:id",checkAccessToken, deleteProperty);
propertyRouter.get("/my-properties",checkAccessToken, myProperties);
propertyRouter.post("/status", PropertyStatus);

module.exports = propertyRouter;