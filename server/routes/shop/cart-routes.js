const express = require("express");

const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} = require("../../controllers/shop/cart-controller");
const { addToWishlist, removeFromWishlist, fetchWishlist } = require("../../controllers/shop/wishlist-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);
router.delete("/wishlist/", removeFromWishlist);
router.post("/wishlist/", addToWishlist);
router.get("/wishlist/:userId", fetchWishlist);           

module.exports = router;
