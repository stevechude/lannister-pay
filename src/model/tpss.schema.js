const mongoose = require('mongoose');
const validator = require("validator");

const lannisterSchema = new mongoose.Schema({
  ID: {
    type: Number,
    // required: true,
    unique: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    required: true,
  },
  CustomerEmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email.",
    },
  },
  SplitInfo: [
    {
      SplitType: { type: String, required: true, enum: ['FLAT', 'PERCENTAGE', 'RATIO'] },
      SplitValue: { type: Number, required: true },
      SplitEntityId: { type: String, required: true },
    },
  ],
},
{
  timestamps: true,
});

const LannisterPay = mongoose.model('LannisterPay', lannisterSchema);

module.exports = LannisterPay;