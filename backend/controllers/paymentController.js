const catchAsyncError = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");

// Initialize Razorpay instance with your Razorpay API key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new Razorpay order
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise,
    currency: "INR",
    receipt: "receipt_order",
    payment_capture: 0,
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to create Razorpay order",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  });
});

// Capture a Razorpay payment
exports.capturePayment = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const generated_signature = hmac_sha256(
    `${razorpay_order_id}|${razorpay_payment_id}`,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Razorpay signature validation failed",
    });
  }

  razorpay.payments.capture(
    razorpay_payment_id,
    order.amount,
    "INR",
    async (err, payment) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to capture payment",
        });
      }

      const newPayment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await newPayment.save();

      return res.status(200).json({
        success: true,
        payment,
      });
    }
  );
});
