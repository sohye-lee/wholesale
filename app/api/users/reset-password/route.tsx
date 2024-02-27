import startDb from "@/app/lib/db";
import { sendEmail } from "@/app/lib/sendEmail";
import { EmailOptions } from "@/app/lib/types";
import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { NextResponse } from "next/server";

interface ResetPasswordRequest {
  password: string;
  userId: string;
  token: string;
}

export const PUT = async (req: Request) => {
  const body = await req.json();
  const { password, userId, token } = body as ResetPasswordRequest;

  await startDb();

  if (!userId || !token)
    return NextResponse.json(
      {
        ok: false,
        message: "Not a valid request.",
      },
      { status: 401 }
    );

  const existingToken = await EmailVerificationToken.findOne({
    user: userId,
  });

  if (!existingToken)
    return NextResponse.json(
      {
        ok: false,
        message: "No token.",
      },
      { status: 401 }
    );

  await EmailVerificationToken.findByIdAndDelete(existingToken._id);

  const user = await UserModel.findByIdAndUpdate(userId, {
    password,
  });

  const options: EmailOptions = {
    profile: {
      name: user?.name!,
      email: user?.email!,
    },
    subject: "password-changed",
  };

  sendEmail(options);

  return NextResponse.json({
    ok: true,
    message: "Successfully updated! Please login with your new password.",
    user,
  });
};
