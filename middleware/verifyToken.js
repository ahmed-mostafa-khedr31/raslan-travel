const { httpStatus, httpMessage } = require("../utils/httpStatus");
const jwt = require("jsonwebtoken");
function readToken(authHeader) {
  if (!authHeader) return "";
  const parts = authHeader.trim().split(/\s+/);
  return parts.find((part) => part.split(".").length === 3) || "";
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = readToken(authHeader);
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: httpMessage.TOKEN_REQUIRED,
      data: null,
      error: null,
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: httpMessage.UNAUTHORIZED,
      data: null,
      error: error.message,
    });
  }
};
module.exports = verifyToken;
