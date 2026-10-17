process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test-access-secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test-refresh-secret";

const { describe, it, before, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const mongoose = require("mongoose");
const { genrateAccessToken } = require("../src/utils/genrateJwtToken");
const propertyModel = require("../src/models/property.model");
const app = require("../src/app");

const ownerId = new mongoose.Types.ObjectId();
const otherId = new mongoose.Types.ObjectId();
const propertyId = new mongoose.Types.ObjectId();

const ownerToken = genrateAccessToken(
  ownerId,
  "owner",
  "owner@example.com",
  "15m",
);
const otherToken = genrateAccessToken(
  otherId,
  "other",
  "other@example.com",
  "15m",
);

const existingProperty = {
  _id: propertyId,
  owner: ownerId,
  title: "Owner listing",
  description: "A listed home",
  purpose: "Sale",
  propertyType: "House",
  price: 100000,
  address: "1 Main St",
  bathrooms: 2,
  bedrooms: 3,
  area: 1200,
  areaUnit: "sqft",
  image: "https://example.com/image.jpg",
};

describe("property owner authorization", () => {
  let originalFindById;
  let originalFindByIdAndUpdate;
  let originalFindByIdAndDelete;

  before(() => {
    originalFindById = propertyModel.findById;
    originalFindByIdAndUpdate = propertyModel.findByIdAndUpdate;
    originalFindByIdAndDelete = propertyModel.findByIdAndDelete;
  });

  afterEach(() => {
    propertyModel.findById = originalFindById;
    propertyModel.findByIdAndUpdate = originalFindByIdAndUpdate;
    propertyModel.findByIdAndDelete = originalFindByIdAndDelete;
  });

  it("rejects PATCH from a user who does not own the property", async () => {
    let updated = false;
    propertyModel.findById = async () => existingProperty;
    propertyModel.findByIdAndUpdate = async () => {
      updated = true;
      return existingProperty;
    };

    const res = await request(app)
      .patch(`/api/v1/property/${propertyId}`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({ title: "Hijacked listing" });

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(updated, false);
  });

  it("allows PATCH from the property owner", async () => {
    propertyModel.findById = async () => existingProperty;
    propertyModel.findByIdAndUpdate = async () => ({
      ...existingProperty,
      title: "Updated listing",
    });

    const res = await request(app)
      .patch(`/api/v1/property/${propertyId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Updated listing" });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.property.title, "Updated listing");
  });

  it("rejects DELETE from a user who does not own the property", async () => {
    let deleted = false;
    propertyModel.findById = async () => existingProperty;
    propertyModel.findByIdAndDelete = async () => {
      deleted = true;
      return existingProperty;
    };

    const res = await request(app)
      .delete(`/api/v1/property/${propertyId}`)
      .set("Authorization", `Bearer ${otherToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.equal(deleted, false);
  });

  it("allows DELETE from the property owner", async () => {
    propertyModel.findById = async () => existingProperty;
    propertyModel.findByIdAndDelete = async () => existingProperty;

    const res = await request(app)
      .delete(`/api/v1/property/${propertyId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("returns 404 when updating a missing property", async () => {
    propertyModel.findById = async () => null;

    const res = await request(app)
      .patch(`/api/v1/property/${propertyId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ title: "Missing" });

    assert.equal(res.status, 404);
  });
});
