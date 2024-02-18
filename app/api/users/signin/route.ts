import startDb from '@/app/lib/db';
import { SignInCredential } from '@/app/lib/types';
import UserModel from '@/app/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  // try {
  const { email, password } = (await req.json()) as SignInCredential;
  if (!email || !password)
    return NextResponse.json(
      {
        ok: false,
        message: 'Email or password missing. Please retry.',
      },
      { status: 401 }
    );

  await startDb();
  const existingUser = await UserModel.findOne({
    email,
  });

  if (!existingUser)
    return NextResponse.json({
      ok: false,
      message: "This email doesn't exist.",
    });

  const verified = await existingUser.comparePassword(password);
  if (!verified) {
    return NextResponse.json({
      ok: false,
      message: 'The password does not match.',
    });
  }

  console.log('sign in completed: ', existingUser);

  return NextResponse.json({
    ok: true,
    message: 'Successfully logged in!',
    user: existingUser,
  });
  // } catch (error) {
  //   throw error;
  // }
};
