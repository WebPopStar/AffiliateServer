const jwt = require("jsonwebtoken");
const getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: 60 * 60,
  });
  return token;
};
module.exports = getToken;
