"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seller = void 0;
const data_source_1 = require("../../data-source");
const seller_1 = require("../../entities/seller");
const sellerModel = data_source_1.AppDataSource.getRepository(seller_1.Seller);
const seller = async (req, res) => {
    try {
        const sellerFromBody = req.body;
        const sellerMap = sellerModel.create(sellerFromBody);
        await sellerModel.save(sellerMap);
    }
    catch (e) {
        return res.status(405).send(e);
    }
};
exports.seller = seller;
