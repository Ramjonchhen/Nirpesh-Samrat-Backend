"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = require("../controllers/users/users.service");
const sellerRoute = (0, express_1.Router)();
sellerRoute.post("/users", users_service_1.seller);
exports.default = sellerRoute;
