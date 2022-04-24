const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user_id,
  };

  return jwt.sign(payload, process.env.jwtsecret, { expiresIn: "5h" });
}

module.exports = jwtGenerator;
