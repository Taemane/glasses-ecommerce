const router = require("express").Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { subscriber_email } = req.body;

    const checkDuplicate = await db.query(
      "SELECT * FROM subscribers WHERE subscriber_email = $1",
      [subscriber_email]
    );

    if (checkDuplicate.rows.length > 0) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    const newSusbcriber = await db.query(
      "INSERT INTO subscribers(subscriber_email) VALUES($1)",
      [subscriber_email]
    );

    if (newSusbcriber.rows.length > 0) {
      return res.status(200).json({
        message: "Successfully added to our newletter",
      });
    } else {
      return res.status(401).json({
        message: "Error",
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
