"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const noteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "Title must be at least 5 characters long"],
        maxlength: [128, "Title can't be more than 128 characters"],
    },
    content: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        lowercase: true,
        enum: ["personal", "work", "study", "other"],
        default: "personal",
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    tags: {
        label: {
            type: String,
            trim: true,
            required: true,
        },
        color: {
            type: String,
            default: "#000000",
            validate: [validator_1.default.isHexColor, "{VALUE} is not a valid color"],
        },
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
noteSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
