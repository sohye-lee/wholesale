'use client';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from '../UI/button/button';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter, redirect } from 'next/navigation';
// import useNotification from '@/app/hooks/useNotification';

import {
  NotificationContext,
  useNotification,
} from '@/app/contexts/notificationContext';
import { NotificationProps } from '@/app/lib/types';

interface SigninFormProps {
  email: string;
  password: string;
}
export default function SignInForm() {
  const router = useRouter();
  const session = useSession();
  // const { notify } = useNotification();
  // const { close, notify } = useContext(NotificationContext);
  const { notify, close } = useNotification();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninFormProps>({ mode: 'onBlur' });

  const onValid = async (validForm: SigninFormProps) => {
    const res = await signIn('credentials', { ...validForm, redirect: false });
    if (res?.error == 'CredentialsSignin') {
      const notification: NotificationProps = {
        mode: 'error',
        message: 'The password does not match.',
        timeout: 5,
        handleClose: close,
      };
      notify(notification);
      // notify({ mode: 'error', message: 'The password does not match.' });
      toast.error('The password does not match.');
    }
    if (!res?.error) {
      router.refresh();
      // notify({ mode: 'success', message: 'Successfully logged in!' });
      const notification: NotificationProps = {
        mode: 'success',
        message: 'Successfully logged in!',
        timeout: 5,
        handleClose: close,
      };
      notify(notification);
      toast.success('Successfully logged in!');
    }
  };

  useEffect(() => {
    session?.data?.user && redirect('/');
  }, [session?.data?.user]);
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white"
    >
      <h1 className="text-xl font-medium uppercase text-center mb-3">
        Welcome Back
      </h1>

      <Input
        placeholder="email"
        name="email"
        register={register('email', {
          required: 'You must write your email address.',
        })}
        type="email"
        required={true}
        errorMessage={errors.email?.message || null}
      />
      <Input
        placeholder="password"
        name="password"
        register={register('password', {
          required: 'Please write your password.',
        })}
        type="password"
        required={true}
        errorMessage={errors.password?.message || null}
      />
      <Button mode="CTA" addClass="w-full py-3" button={true} size="medium">
        Login
      </Button>
      <Button
        mode="neutral"
        addClass="w-full py-3"
        button={false}
        link="/auth/register"
        size="medium"
      >
        Sign Up
      </Button>
      <div className="text-center text-xs text-stone-700 hover:text-amber-800">
        <Link href="/auth/forgot-password">Forgot Password</Link>
      </div>
    </form>
  );
}
