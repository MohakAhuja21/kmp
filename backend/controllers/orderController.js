const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail");

//Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  // send email to user
  try {
    await sendEmail({
      email: "mohakahuja150@gmail.com",
      subject: "New Order Confirmation",
      message: `New order has been placed on website. Please look at it ASAP. Here are the order details,\n
Address Info:
Name: ${req.user.name}
Address: ${shippingInfo.address}
City: ${shippingInfo.city}
State: ${shippingInfo.state}
Phone No: ${shippingInfo.phoneNo}\n 
Order Items:
${orderItems.map((item) => `Name: ${item.name}\nPrice: ${item.price}`).join("\n\n")}\n  
Total Price: ${totalPrice}
      `,
      data: {
        name: req.user.name,
        shippingInfo,
        orderItems,
        totalPrice,
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Error sending email", 500));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

//Get Single Order Details
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Orders Details or My Order Details(Access by Only Login User)
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get All Orders Details (Access by Only Admin)
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update Order Status (Admin only)
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this oder", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (odr) => {
      await updateStock(odr.product, odr.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ ValidateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ ValidateBeforeSave: false });
}

//Delete Order(Admin only)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
