const router = require("express").Router();
const db = require("../db");
require("dotenv").config();
const authorization = require("../middleware/authorization");

// Get all cart items
router.get("/", authorization, async (req, res) => {
  try {
    const user_id = req.user_id;

    const cartItems = await db.query("SELECT * FROM cart WHERE user_id = $1", [
      user_id,
    ]);

    if (cartItems.rows.length > 0) {
      res.status(200).json({
        status: "success",
        results: cartItems.rows.length,
        data: cartItems.rows,
      });
    } else {
      res.status(401).json({
        message: "You submitted a bad request or your cart is empty",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// Add item to cart
router.post("/", authorization, async (req, res) => {
  try {
    const {
      product_name,
      product_price,
      product_quantity,
      product_id,
      user_id,
    } = req.body;

    const newCartItem = await db.query(
      "INSERT INTO cart (product_name, product_price,product_quantity, product_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [product_name, product_price, product_quantity, product_id, user_id]
    );

    if (newCartItem.rows.length > 0) {
      res.status(200).json({
        message: "Item added successfully",
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
// Edit Item
router.put("/:id", authorization, async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const {
      product_name,
      product_price,
      product_quantity,
      product_id,
      user_id,
    } = req.body;

    const editedCartItem = await db.query(
      "UPDATE cart SET product_name = $1, product_price = $2,product_quantity =$3 product_id = $4, user_id = $5 WHERE item_id = $6 RETURNING *",
      [
        product_name,
        product_price,
        product_quantity,
        product_id,
        user_id,
        cartItemId,
      ]
    );

    if (editedCartItem.rows.length > 0) {
      res.status(200).json({
        message: "Item edited successfully",
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
// Delete 1 item
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { cartItemId } = req.params.id;

    const cartItem = await db.query("DELETE FROM cart WHERE item_id = $1", [
      cartItemId,
    ]);

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// Emptying the cart
router.delete("/", authorization, async (req, res) => {
  try {
    const { user_id } = req.body;

    const deleteAll = await db.query("DELETE FROM cart WHERE user_id = $1", [
      user_id,
    ]);

    res.status(200).json({
      message: "All cart items were deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
