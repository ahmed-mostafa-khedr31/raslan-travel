const { httpStatus, httpMessage } = require("../utils/httpStatus");
const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: httpMessage.UNAUTHORIZED_ACCESS });
    }
    next();
  };
};

module.exports = authorize;
