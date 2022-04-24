const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const allProducts = await db.query("SELECT * FROM products");

    if (allProducts.rows.length > 0) {
      res.status(200).json({
        status: "success",
        results: allProducts.rows.length,
        data: allProducts.rows,
      });
    } else {
      res.status(401).json({
        message: "No products found as yet",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//id
router.get("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;

    const product = await db.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );

    if (product.rows.length > 0) {
      res.status(200).json({
        status: "success",
        results: product.rows.length,
        data: product.rows[0],
      });
    } else {
      res.status(401).json({
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
