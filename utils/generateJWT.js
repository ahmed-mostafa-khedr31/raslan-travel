const jwt = require("jsonwebtoken");

const generateJWT = async (email, id, role) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign({ email, id, role }, secretKey, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const generateRefreshJWT = async (email, id, role) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign({ email, id, role }, secretKey, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = { generateJWT, generateRefreshJWT };
