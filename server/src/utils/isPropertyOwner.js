const isPropertyOwner = (property, userId) => {
  if (!property || userId == null || userId === "") {
    return false;
  }

  const ownerId = property.owner?._id ?? property.owner;

  if (ownerId == null || ownerId === "") {
    return false;
  }

  return String(ownerId) === String(userId);
};

module.exports = isPropertyOwner;
