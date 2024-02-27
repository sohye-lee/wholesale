import startDb from "@/app/lib/db";
import { sendEmail } from "@/app/lib/sendEmail";
import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { EmailOptions, EmailVerifyRequest } from "@lib/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (req: Request) => {
  try {
    const { token, userId } = (await req.json()) as EmailVerifyRequest;
    await startDb();

    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json(
        { ok: false, message: "Invalid request. A valid token is required!" },
        { status: 401 }
      );
    }
    const foundToken = await EmailVerificationToken.findOne({
      user: userId,
    });

    const verified = await foundToken?.compareToken(token);

    if (!foundToken) {
      return NextResponse.json(
        { error: "Couldn't verify the token." },
        { status: 401 }
      );
    }
    const user = await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(foundToken._id);

    return NextResponse.json({
      ok: true,
      message: "Your email has been verified!",
      user,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: "Could not verify your email.",
      message: "Could not verify your email.",
    });
  }
};

export const GET = async (req: Request, context: any) => {
  try {
    const userId = req.url.split("?userId=")[1];
    await startDb();

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { ok: false, message: "Invalid request. No user Id." },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({
      _id: userId,
    });

    if (!user)
      return NextResponse.json(
        { ok: false, message: "This user does not exist." },
        { status: 401 }
      );

    if (user.verified)
      return NextResponse.json(
        { ok: false, message: "User already verified." },
        { status: 401 }
      );

    const token = crypto.randomBytes(36).toString("hex");

    const tokenObj = await EmailVerificationToken.create({
      user: user?._id,
      token,
    });

    const verificationUrl = `${process.env.HOST}/verify?token=${token}&userId=${user?._id}`;

    const options: EmailOptions = {
      profile: {
        name: user.name!,
        email: user.email!,
      },
      subject: "verification",
      linkUrl: verificationUrl,
    };

    sendEmail(options);

    return NextResponse.json({
      ok: true,
      message:
        "The link has been sent to your email. Please check your mailbox.",
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: "Something went wrong.",
      message: "Something went wrong.",
    });
  }
};
