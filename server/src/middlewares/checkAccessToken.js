const jwt = require("jsonwebtoken");

const checkAccessToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(400).json({
        status: false,
        message: "Access Denied",
      });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Access Denied",
      });
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodeToken;
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        status: false,
        message: "Invalid or expired token",
      });
    }

    console.error("JWT middleware error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};


module.exports = checkAccessToken;