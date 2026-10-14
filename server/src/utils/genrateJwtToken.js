const jwt = require("jsonwebtoken");

const genrateAccessToken = (userid, username, email, time) => {
  const token = jwt.sign(
    {
      userid,
      username,
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: time,
    },
  );

  return token;
};

const genrateRefreshToken = (userid, username, email, time) => {
  const token = jwt.sign(
    {
      userid,
      username,
      email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: time,
    },
  );

  return token;
};

module.exports = { genrateAccessToken, genrateRefreshToken };
