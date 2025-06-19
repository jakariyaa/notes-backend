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
const user_model_1 = __importDefault(require("../models/user.model"));
const usersRouter = (0, express_1.Router)();
exports.default = usersRouter;
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find().sort({ name: "asc" });
    res.json(users);
}));
usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    res.json(user);
}));
usersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(req.body);
    res.status(201).json(user);
}));
usersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    user.set(req.body);
    yield user.save();
    res.json(user);
}));
usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndDelete(req.params.id);
    res.json(user);
}));
