import { Model, model, Schema } from "mongoose";
import {
  IUser,
  IUserAddress,
  UserInstanceMethods,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";

const addressSchema = new Schema<IUserAddress>(
  {
    street: String,
    city: String,
    zip: Number,
  },
  { _id: false }
);

const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z' -]+$/.test(value),
        message: "{VALUE} is not a valid name",
      },
    },
    age: {
      type: Number,
      required: true,
      min: [6, "User must be at least 6 years old"],
    },
    address: {
      type: addressSchema,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, "Email already in use"],
      trim: true,
      validate: [validator.isEmail, "{VALUE} is not a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        //delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.methods.hashPassword = function () {
  const password = this.password;
  this.password = bcrypt.hashSync(password, 10);
};

userSchema.pre("save", function (next) {
  this.hashPassword();
  next();
});

userSchema.post("save", function (doc, next) {
  console.log(`Saved: ${doc.name} - ${doc.email}`);
  next();
});

userSchema.virtual("addressString").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.zip}`;
});

const User = model("User", userSchema);

export default User;
