const mongoose = require("mongoose");

const porpertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purpose: {
      type: String,
      enum: ["Sale", "Rent"],
      default: "Sale",
    },
    propertyType: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    bathrooms: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    area: {
      type: Number,
      required: true,
      trim: true,
    },
    areaUnit: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const propertyModel = mongoose.model("properties", porpertySchema);

module.exports = propertyModel;