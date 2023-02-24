"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = require("./users.service");
const index_1 = __importDefault(require("../../utils/logger/index"));
const UserController = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get User Data
 *     description: Users are received
 *
 */
UserController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (0, users_service_1.getUsers)();
        res.status(200).send(data);
    }
    catch (err) {
        index_1.default.error(err);
        res.sendStatus(404);
    }
}));
UserController.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const data = yield (0, users_service_1.getUser)(name);
        res.status(200).send(data);
    }
    catch (err) {
        index_1.default.error(err);
        res.sendStatus(404);
    }
}));
UserController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, skill } = req.body;
        const data = yield (0, users_service_1.addUser)({ name, skill });
        res.status(200).send(data);
    }
    catch (err) {
        index_1.default.error(err);
        res.sendStatus(404);
    }
}));
UserController.delete('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const data = yield (0, users_service_1.deleteUser)(name);
        res.status(200).send(data);
    }
    catch (err) {
        index_1.default.error(err);
        res.sendStatus(404);
    }
}));
exports.default = UserController;
