"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _connections = _interopRequireDefault(require("./Database/connections.js"));

var _googleConfig = _interopRequireDefault(require("./config/google.config.js"));

var _routeConfig = _interopRequireDefault(require("./config/route.config.js"));

var _passport = _interopRequireDefault(require("passport"));

var _index = _interopRequireDefault(require("./API/image/index.js"));

var _index2 = _interopRequireDefault(require("./API/auth/index.js"));

var _index3 = _interopRequireDefault(require("./API/restaurent/index.js"));

var _index4 = _interopRequireDefault(require("./API/food/index.js"));

var _index5 = _interopRequireDefault(require("./API/menu/index.js"));

var _index6 = _interopRequireDefault(require("./API/review/index.js"));

var _index7 = _interopRequireDefault(require("./API/user/index.js"));

var _index8 = _interopRequireDefault(require("./API/order/index.js"));

var _expressSession = _interopRequireDefault(require("express-session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

(0, _googleConfig["default"])(_passport["default"]);
(0, _routeConfig["default"])(_passport["default"]);
var zomato = (0, _express["default"])();
zomato.use((0, _cors["default"])());
zomato.use(_express["default"].json());
zomato.use((0, _helmet["default"])());
zomato.use((0, _expressSession["default"])({
  secret: 'ssshhhhh'
}));
zomato.use(_passport["default"].initialize());
zomato.use("/api/auth", _index2["default"]);
zomato.use("/api/image", _index["default"]);
zomato.use("/api/restaurent", _index3["default"]);
zomato.use("/api/food", _index4["default"]);
zomato.use("/api/menu", _index5["default"]);
zomato.use("/api/order", _index8["default"]);
zomato.use("/api/review", _index6["default"]);
zomato.use("/api/user", _index7["default"]);
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