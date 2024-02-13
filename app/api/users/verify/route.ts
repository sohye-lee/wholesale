import startDb from "@/app/lib/db";
import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { EmailVerifyRequest } from "@lib/types";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await startDb();
  try {
    const { token, userId } = (await req.json()) as EmailVerifyRequest;

    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json(
        { error: "Invalid request. A valid token is required!" },
        { status: 401 }
      );
    }
    const foundToken = await EmailVerificationToken.findOne({
      user: userId,
    });

    if (foundToken) console.log("found token: ", foundToken);

    const verified = await foundToken?.compareToken(token);
    if (!foundToken || !verified) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }

    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(foundToken._id);

    return NextResponse.json({
      ok: true,
      message: "Your email has been verified!",
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: "Could not verify your email.",
      message: "Could not verify your email.",
    });
  }
};
