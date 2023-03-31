const express = require("express");
const router = express.Router();
const {
  createCoupon,
  validateCoupon,
  getAllCoupons,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/couponController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Create coupon
// Create coupon
router.post("/coupons", isAuthenticatedUser, authorizeRoles("admin"), createCoupon);

// Get all coupons
router.get("/coupons", getAllCoupons);

// Delete coupon
router.delete("/admin/coupon/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

// Update coupon
// router.put("/admin/coupon/:id", isAuthenticatedUser, authorizeRoles("admin"), updateCoupon);


module.exports = router;
