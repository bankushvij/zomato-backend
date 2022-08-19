"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MenuSchema = new _mongoose["default"].Schema({
  menu: [{
    name: {
      type: String,
      required: true
    },
    items: [{
      type: _mongoose["default"].Types.ObjectId,
      ref: "Foods"
    }]
  }],
  recomended: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Foods",
    unique: true
  }]
});

var MenuModel = _mongoose["default"].models['Menu'] || _mongoose["default"].model("Menu", MenuSchema); // menu:[{"name":"Recommended"}],
// "recomended":["62cc2b242249374c506ef91a"]


exports.MenuModel = MenuModel;