const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const isPropertyOwner = require("../src/utils/isPropertyOwner");

describe("isPropertyOwner", () => {
  const ownerId = new mongoose.Types.ObjectId();
  const otherId = new mongoose.Types.ObjectId();

  it("returns true when the user owns the property", () => {
    assert.equal(isPropertyOwner({ owner: ownerId }, ownerId), true);
    assert.equal(isPropertyOwner({ owner: ownerId }, String(ownerId)), true);
  });

  it("returns true when owner is a populated user document", () => {
    assert.equal(
      isPropertyOwner({ owner: { _id: ownerId, username: "seller" } }, ownerId),
      true,
    );
  });

  it("returns false when another user attempts access", () => {
    assert.equal(isPropertyOwner({ owner: ownerId }, otherId), false);
  });

  it("returns false when property or user id is missing", () => {
    assert.equal(isPropertyOwner(null, ownerId), false);
    assert.equal(isPropertyOwner({ owner: ownerId }, null), false);
    assert.equal(isPropertyOwner({ owner: ownerId }, ""), false);
    assert.equal(isPropertyOwner({}, ownerId), false);
  });
});
