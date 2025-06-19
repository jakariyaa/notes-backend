import { model, Schema, version } from "mongoose";
import { INote } from "../interfaces/note.interface";
import validator from "validator";

const noteSchema = new Schema<INote>(
  {
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
        validate: [validator.isHexColor, "{VALUE} is not a valid color"],
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

noteSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Note = model("Note", noteSchema);

export default Note;
