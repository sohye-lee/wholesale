import { EmailOptions, NewUserRequest } from '@/app/lib/types';
import EmailVerificationToken from '@models/emailVerificationToken';
import UserModel from '@/app/models/userModel';
import startDb from '@lib/db';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { sendEmail } from '@/app/lib/functions';

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
        'This email already exists. Please try again with another email.',
    });

  const user = await UserModel.create({ ...body });

  const token = crypto.randomBytes(36).toString('hex');

  EmailVerificationToken.create({
    user: user._id,
    token,
  });

  // const transport = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: '24d1b62fbb8a5d',
  //     pass: 'd9c73e0f1697d3',
  //   },
  // });

  // const verificationUrl = `${process.env.HOST}/verify?token=${token}&userId=${user._id}`;

  // transport.sendMail({
  //   from: 'verification@claviswholesale.com',
  //   to: user.email,
  //   html: `<p>Please verify your email by clicking <a href="${verificationUrl}">this link</a></p>`,
  // });

  const options: EmailOptions = {
    profile: {
      name: user?.name!,
      email: user?.email!,
    },
    subject: 'password-changed',
  };
  sendEmail(options);

  return NextResponse.json({
    ok: true,
    message: 'A verification email has been sent. Please check your mailbox!',
  });
};
