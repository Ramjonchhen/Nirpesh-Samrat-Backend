"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const data_source_1 = require("./data-source");
const PORT = process.env.PORT || 3500;
(0, data_source_1.DbConnect)();
server_1.default.listen(PORT, () => {
    console.log(`Server Listening to PORT: ${PORT}`);
});
