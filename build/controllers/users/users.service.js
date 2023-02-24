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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seller = void 0;
const data_source_1 = require("../../data-source");
const seller_1 = require("../../entities/seller");
const sellerModel = data_source_1.AppDataSource.getRepository(seller_1.Seller);
const seller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerFromBody = req.body;
        const sellerMap = sellerModel.create(sellerFromBody);
        yield sellerModel.save(sellerMap);
    }
    catch (e) {
        return res.status(405).send(e);
    }
});
exports.seller = seller;
