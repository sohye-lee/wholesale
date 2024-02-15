import { compare, genSalt, hash } from "bcrypt";
import { Model, Schema, model, models } from "mongoose";
import { UserDocument } from "@lib/types";

interface Method {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Method>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: Object, url: String, id: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  } catch (error) {
    throw new Error(error as any).message;
  }
});

userSchema.pre("updateOne", async function (next) {
  try {
    console.log("password update working");
    const user = await this.model.findOne(this.getQuery());
    const salt = await genSalt(10);
    this.set({ password: await hash(user.password, salt) });
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Method>;
