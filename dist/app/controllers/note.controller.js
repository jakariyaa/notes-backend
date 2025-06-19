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
const note_model_1 = __importDefault(require("../models/note.model"));
const notesRouter = (0, express_1.Router)();
exports.default = notesRouter;
notesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_model_1.default.find().populate("user", { name: 1 });
    res.json(notes);
}));
notesRouter.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_model_1.default.find({
        $or: [
            { title: { $regex: req.query.q, $options: "i" } },
            { content: { $regex: req.query.q, $options: "i" } },
        ],
    }).populate("user", { name: 1 });
    res.json(notes);
}));
notesRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.findById(req.params.id).populate("user");
    res.json(note);
}));
notesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const note = yield note_model_1.default.create(req.body);
    res.json(note);
}));
notesRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(note);
}));
notesRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.findByIdAndDelete(req.params.id);
    res.json(note);
}));
