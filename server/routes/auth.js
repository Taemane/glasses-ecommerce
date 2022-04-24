const router = require("express").Router();
const db = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validate = require("../middleware/validate");

// Login
router.post("/login", validate, async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);

    //Check if email recieved exists in the DB
    if (user.rows.length === 0) {
      res.status(401).json({
        message: "Email or Password is incorrect",
      });
    }

    //Password comparison
    if (user_password === user.rows[0].user_password) {
      //Generate the token
      const token = jwtGenerator(user.rows[0].user_id);

      return res.status(200).json({
        token,
      });
    } else {
      return res.status(401).json({
        message: "Email or Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Register
router.post("/register", validate, async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);

    if (user.rows.length > 0) {
      res.status(401).json({
        message: `Account with ${user_email} already exists. Sorry`,
      });
    }

    const newUser = await db.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [user_name, user_email, user_password]
    );

    if (newUser.rows.length > 0) {
      res.status(200).json({
        status: "success",
        results: newUser.rows.length,
        data: newUser.rows[0],
      });
    } else {
      res.status(400).json({
        message: "Bad request",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
