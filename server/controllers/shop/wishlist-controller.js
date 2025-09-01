const User = require("../../models/User");

const   addToWishlist = async () => {
  try {
    console.log('addToWishlist called');
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.wishlist.includes(productId)) {
      res.status(400).json({ success: false, message: "Product already in wishlist!" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ success: true, message: "Product added to wishlist!" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
}}

const removeFromWishlist = async () => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found!" };
    }

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return { success: false, message: "Product not in wishlist!" };
    }

    user.wishlist.splice(index, 1);
    await user.save();

    return { success: true, message: "Product removed from wishlist!" };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { success: false, message: "Server error" };
  }
}

const fetchWishlist = async () => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return { success: false, message: "User not found!" };
    }

    return { success: true, items: user.wishlist };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { success: false, message: "Server error" };
  }
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
};