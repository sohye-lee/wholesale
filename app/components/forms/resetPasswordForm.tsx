'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from '../UI/button/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, redirect, useSearchParams } from 'next/navigation';
import useRequest from '@/app/hooks/useRequest';

interface ResetPasswordForm {
  password: string;
  confirmpassword: string;
  userId: string;
  token: string;
}
export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const userId = params.get('userId');

  const router = useRouter();
  const session = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordForm>({ mode: 'onBlur' });

  const [resetPassword, { data, error, loading }] = useRequest(
    `/api/users/reset-password`,
    'PUT'
  );

  const onValid = async (validForm: ResetPasswordForm) => {
    resetPassword(validForm);
  };

  useEffect(() => {
    session?.data?.user && redirect('/');

    data && data?.ok && redirect('/auth/login');
  }, [data, session.data]);
  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white"
    >
      <h1 className="text-xl font-medium uppercase text-center mb-3">
        Welcome Back
      </h1>

      <Input
        placeholder="password"
        name="password"
        register={register('password', {
          required: 'Please write your new password.',
        })}
        type="password"
        required={true}
        errorMessage={errors.password?.message || null}
      />
      <Input
        placeholder="confirm password"
        name="confirmpassword"
        register={register('confirmpassword', {
          required: 'Please confirm your password.',
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'Your passwords do no match.';
            }
          },
        })}
        type="password"
        required={true}
        errorMessage={errors.confirmpassword?.message || null}
      />
      <input hidden {...register('userId')} value={userId + ''} />
      <input hidden {...register('token')} value={token + ''} />
      <Button
        mode="CTA"
        addClass="w-full py-3"
        button={true}
        size="medium"
        loading={loading}
      >
        Reset Password
      </Button>

      <div className="text-center text-xs text-stone-700 hover:text-amber-800 mt-3">
        <Link href="/">Go Home</Link>
      </div>
    </form>
  );
}
