import { combineStrings } from "./../lib/functions";
import { compare, genSalt, hash } from "bcrypt";
import mongoose, { Document, Model, ObjectId, Schema, models } from "mongoose";

interface EmailVerificationTokenDocument extends Document {
  user: ObjectId;
  token: string;
  createdAt: Date;
}

interface Method {
  compareToken(token: string): Promise<boolean>;
}

const emailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  Method
>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24,
  },
});

emailVerificationTokenSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("token")) {
      return next();
    }
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
    next();
  } catch (error) {
    throw error;
  }
});

emailVerificationTokenSchema.methods.compareToken = function (tokenToCompare) {
  return compare(tokenToCompare, this.token);
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  mongoose.model("EmailVerificationToken", emailVerificationTokenSchema);

export default EmailVerificationToken as Model<
  EmailVerificationTokenDocument,
  {},
  Method
>;
