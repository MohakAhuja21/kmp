const Coupon = require("../models/couponModel");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createCoupon = catchAsyncError(async (req, res, next) => {
  const {
    code,
    type,
    discount,
    minimumOrderAmount,
    expiry,
    usageLimit,
    oneTime,
  } = req.body;

  if (
    !code ||
    !type ||
    !discount ||
    !minimumOrderAmount ||
    !expiry ||
    !usageLimit
  ) {
    return res.status(400).json({
      success: false,
      error: "Please provide all the information",
    });
  }

  const coupon = {
    code: code.toLowerCase(),
    type,
    discount,
    minimumOrderAmount,
    expiry,
    usageLimit,
    oneTime,
  };

  await Coupon.create(coupon);

  return res.status(200).json({
    success: true,
    message: "Coupon Created",
  });
});


exports.getAllCoupons = catchAsyncError(async (req, res, next) => {
  const coupons = await Coupon.find();
  return res.status(200).json(coupons);
});

exports.deleteCoupon = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, error: "Provide valid id" });
  }

  const coupons = await Coupon.findByIdAndDelete(id);

  return res
    .status(200)
    .json({ success: true, message: "Coupon Deleted Successfully" });
});