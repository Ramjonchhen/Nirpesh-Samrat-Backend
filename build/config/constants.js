"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ENVIRONMENT = exports._USERNAME = exports._DB_NAME = void 0;
exports._DB_NAME = process.env.DATABASE_NAME;
exports._USERNAME = process.env.USER_NAME;
exports._ENVIRONMENT = process.env.DEV__ENVIRONMENT === 'true' ? 'development' : 'production';
