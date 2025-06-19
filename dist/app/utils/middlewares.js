"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = unknownEndpoint;
exports.errorHandler = errorHandler;
function unknownEndpoint(req, res) {
    res.status(404).json({ error: "Unknown endpoint reached" });
}
function errorHandler(err, req, res, next) {
    console.log(err.name, err.message);
    if (err.name === "MongooseError" || err.name === "ValidationError") {
        res.status(400).json({ error: err.message });
        return;
    }
    res.status(500).json({
        message: "Something went wrong in the server. Contact the admin.",
    });
}
