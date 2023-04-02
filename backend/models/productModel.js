const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  manufacturer: {
    type:String,
    // required:[true, "please enter product manufacturer"],
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  packaging: {
    type:String,
    // required:false,
  },
  salt_composition:{
    type:String,
    // required:false,
  },
  mrp: {
    type: Number,
    required: [true, "Please Enter product MRP"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 charcters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 charcters"],
    default: 1,
  },
  //--> code here use for give who make this product it giv user type
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }, //end

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
