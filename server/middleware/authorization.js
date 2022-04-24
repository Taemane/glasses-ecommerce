const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      res.status(403).json({
        message: "You are not authorized",
      });
    }
    const payload = await jwt.verify(jwtToken, process.env.jwtsecret);

    req.user_id = payload.user_id;
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
};
