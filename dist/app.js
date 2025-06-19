"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("./app/controllers/note.controller"));
const user_controller_1 = __importDefault(require("./app/controllers/user.controller"));
const middlewares_1 = require("./app/utils/middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/notes", note_controller_1.default);
app.use("/api/users", user_controller_1.default);
app.use(middlewares_1.unknownEndpoint);
app.use(middlewares_1.errorHandler);
exports.default = app;
