const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['percentage']
  },  
  discount: {
    type: Number,
    required: true,
    min: 0
  },
  minimumOrderAmount: {
    type: Number,
    required: true,
    min: 0
  },
  expiry: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    required: true,
    min: 0
  },
  usageCount: {
    type: Number,
    default: 0,
    min: 0
  },
  oneTime: {
    type: Boolean,
    default: false
  },
  usedBy: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponSchema);
