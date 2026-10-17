process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "test-access-secret";
process.env.REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "test-refresh-secret";

const { describe, it, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  genrateAccessToken,
  genrateRefreshToken,
} = require("../src/utils/genrateJwtToken");
const User = require("../src/models/user.model");
const app = require("../src/app");

const userId = new mongoose.Types.ObjectId();
const fakeUser = {
  _id: userId,
  username: "seller",
  email: "seller@example.com",
};

describe("refresh token flow", () => {
  const originalFindById = User.findById;

  afterEach(() => {
    User.findById = originalFindById;
  });

  it("issues a new access token from a refresh cookie without an access token", async () => {
    User.findById = async () => fakeUser;

    const refreshToken = genrateRefreshToken(
      userId,
      fakeUser.username,
      fakeUser.email,
      "7d",
    );

    const res = await request(app)
      .get("/api/v1/auth/refresh-token")
      .set("Cookie", [`refresh-token=${refreshToken}`]);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.newAccessToken);

    const decoded = jwt.verify(
      res.body.newAccessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    assert.equal(String(decoded.userid), String(userId));
  });

  it("still refreshes when the access token is expired", async () => {
    User.findById = async () => fakeUser;

    const expiredAccess = genrateAccessToken(
      userId,
      fakeUser.username,
      fakeUser.email,
      "-1s",
    );
    const refreshToken = genrateRefreshToken(
      userId,
      fakeUser.username,
      fakeUser.email,
      "7d",
    );

    const res = await request(app)
      .get("/api/v1/auth/refresh-token")
      .set("Authorization", `Bearer ${expiredAccess}`)
      .set("Cookie", [`refresh-token=${refreshToken}`]);

    assert.equal(res.status, 201);
    assert.ok(res.body.newAccessToken);
  });

  it("returns 404 when the refresh cookie is missing", async () => {
    const res = await request(app).get("/api/v1/auth/refresh-token");

    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });

  it("returns 401 for an invalid refresh token", async () => {
    const res = await request(app)
      .get("/api/v1/auth/refresh-token")
      .set("Cookie", ["refresh-token=not-a-valid-token"]);

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });
});
