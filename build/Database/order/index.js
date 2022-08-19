"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OrderSchema = new _mongoose["default"].Schema({
  user: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Users"
  }],
  orderdetail: [{
    food: [{
      type: _mongoose["default"].Types.ObjectId,
      ref: "Foods"
    }],
    quantity: {
      type: Number,
      required: true
    },
    paymode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      "default": "placed"
    },
    paymentdetails: {
      itemtotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      }
    }
  }]
}, {
  timestamps: true
});

var OrderModel = _mongoose["default"].models['Order'] || _mongoose["default"].model("Order", OrderSchema);

exports.OrderModel = OrderModel;