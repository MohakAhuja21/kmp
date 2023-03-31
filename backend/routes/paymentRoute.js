const express = require("express");
const {
  processPayment,
  capturePayment
} = require("../controllers/paymentController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/capture-payment").post(isAuthenticatedUser,capturePayment);

module.exports = router;
