"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _connections = _interopRequireDefault(require("./database/connections"));

var _google = _interopRequireDefault(require("./Config/google.config"));

var _route = _interopRequireDefault(require("./Config/route.config"));

var _passport = _interopRequireDefault(require("passport"));

var _image = _interopRequireDefault(require("./API/image"));

var _auth = _interopRequireDefault(require("./API/auth"));

var _restaurent = _interopRequireDefault(require("./API/restaurent"));

var _food = _interopRequireDefault(require("./API/food"));

var _menu = _interopRequireDefault(require("./API/menu"));

var _review = _interopRequireDefault(require("./API/review"));

var _user = _interopRequireDefault(require("./API/user"));

var _order = _interopRequireDefault(require("./API/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var session = require('express-session');

(0, _google["default"])(_passport["default"]);
(0, _route["default"])(_passport["default"]);
var zomato = (0, _express["default"])();
zomato.use((0, _cors["default"])());
zomato.use(_express["default"].json());
zomato.use((0, _helmet["default"])());
zomato.use(session({
  secret: 'ssshhhhh'
}));
zomato.use(_passport["default"].initialize());
zomato.use("/api/auth", _auth["default"]);
zomato.use("/api/image", _image["default"]);
zomato.use("/api/restaurent", _restaurent["default"]);
zomato.use("/api/food", _food["default"]);
zomato.use("/api/menu", _menu["default"]);
zomato.use("/api/order", _order["default"]);
zomato.use("/api/review", _review["default"]);
zomato.use("/api/user", _user["default"]);
zomato.use(_passport["default"].session());
var PORT = process.env.PORT || 4000;
zomato.listen(PORT, function () {
  (0, _connections["default"])().then(function () {
    console.log("Server is running !!!");
  })["catch"](function (error) {
    console.log("Server is running, but database connection failed...");
    console.log(error);
  });
});