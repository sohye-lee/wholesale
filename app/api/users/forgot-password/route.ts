import startDb from '@/app/lib/db';
import UserModel from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import EmailVerificationToken from '@/app/models/emailVerificationToken';
import nodemailer from 'nodemailer';
import { EmailOptions } from '@/app/lib/types';
import { sendEmail } from '@/app/lib/functions';

interface ForgotPasswordRequest {
  email: string;
}

export const POST = async (req: Request) => {
  const body = await req.json();
  const { email } = body as ForgotPasswordRequest;

  await startDb();

  const user = await UserModel.findOne({
    email,
  });

  if (!user)
    return NextResponse.json({
      ok: false,
      message: "This email doesn't exist in our database.",
    });

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

  // const verificationUrl = `${process.env.HOST}/reset-password?token=${token}&userId=${user._id}`;

  // transport.sendMail({
  //   from: 'verification@claviswholesale.com',
  //   to: user.email,
  //   html: `<p>To reset your password, please open <a href="${verificationUrl}">this link</a> and update your password.</p>`,
  // });

  const options: EmailOptions = {
    profile: {
      name: user?.name!,
      email: user?.email!,
    },
    subject: 'forgot-password',
  };
  sendEmail(options);

  return NextResponse.json({
    ok: true,
    message:
      'A link to reset password has been sent. Please check your mailbox.',
  });
};
