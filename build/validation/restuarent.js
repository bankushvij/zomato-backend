"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateRestaurantSearchString = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// export const ValidateRestaurantCity = (restaurantObject) => {
//   const Schema = joi.object({
//     city: joi().string().required(),
//   });
//   return Schema.validateAsync(restaurantObject);
// };
var ValidateRestaurantSearchString = function ValidateRestaurantSearchString(restaurantObject) {
  var Schema = _joi["default"].object({
    searchString: _joi["default"].string().required()
  });

  return Schema.validateAsync(restaurantObject);
};

exports.ValidateRestaurantSearchString = ValidateRestaurantSearchString;