"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const data_source_1 = require("./data-source");
const PORT = process.env.PORT || 3500;
(0, data_source_1.DbConnect)();
server_1.default.listen(PORT, () => {
    console.log(`Server Listening to PORT: ${PORT}`);
});
