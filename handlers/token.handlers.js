const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "10h";

module.exports = {
  generateToken: async (data) => {
    const token = await jwt.sign(data, ACCESS_TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
    return token;
  },
  verifyToken: async (token) => {
    try {
      const verify = await jwt.verify(token, ACCESS_TOKEN_SECRET);
      return verify;
    } catch (error) {
      return false;
    }
  },
};
