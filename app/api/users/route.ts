import { NewUserRequest } from "@/app/lib/types";
import UserModel from "@/app/models/userModel";
import startDb from "@lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async (req: Request) => {
  await startDb();
  const users = await UserModel.find({});
  console.log(users);
  return NextResponse.json({
    ok: true,
    users,
  });
};

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();

  const existingUser = await UserModel.findOne({
    email: body.email,
  });
  if (existingUser)
    return NextResponse.json({
      ok: false,
      message:
        "This email already exists. Please try again with another email.",
    });

  const newUser = await UserModel.create({ ...body });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "24d1b62fbb8a5d",
      pass: "d9c73e0f1697d3",
    },
  });

  transport.sendMail({
    from: "verification@claviswholesale.com",
    to: newUser.email,
    html: `<p>Please verify your email by clicking <a href="http://localhost:3001">this link</a></p>`,
  });

  return NextResponse.json({ ok: true, user: newUser });
};
