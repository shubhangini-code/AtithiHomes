//schema =fixed format/ design of the form
//Model = finished work ..actual form which u give to students

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { type } from "node:os";

//User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
      trim: true, //removes extra spaces

      maxLength: [50, "your name cannot be longer than 50 characters"],
    },
    email: {
      type: String,
      required: [true, " please enter email ID"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter Password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your Password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not the same !",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], //only the given values are accepted
      default: "user",
    },
    avatar: {
      url: { type: String },
      public_id: { type: String },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      select: false,
      index: true,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
      index: true,
    },
  },
  { timestamps: true },
);

//when the response comes from server/backend  we will delete the data
//setting to not pass in response from server
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.passwordConfirm;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.__v; //__v is mongo's version number
    return ret;
    //ret = object to be send as json in response.
    //delete removes the key from it.
    //whnever user doc is converted to json, we remove sensitive and unwanted fields before sending it to the frontend

    // when you type   res.json  in ur code when u are going to type user , mongoose  automatically applies this transformation before returning the response to the user data back
  },
});

//password logic
//Hashing

//pre, save =  runs automatically bfor any user is saved into the database
userSchema.pre("save", async function (next) {
  //if password not changes,we have to say user only edited their mobile
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); //12 is the  rounds strengthens your password,whic makes guessing attacks painfull
  this.passwordConfirm = undefined;
  // next();
});

// login check
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

//forgot password
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

//
const User = mongoose.model("User", userSchema); //mongo db automatically does User into users
export { User };
