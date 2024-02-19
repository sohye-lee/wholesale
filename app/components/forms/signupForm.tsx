'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './input';
import Button from '../UI/button/button';
import Link from 'next/link';
import useRequest from '@/app/hooks/useRequest';
import { NewUserRequest } from '@/app/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignUpForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<NewUserRequest>({ mode: 'onBlur' });

  const [createUser, { data, error, loading }] = useRequest(
    '/api/users',
    'POST'
  );

  const onValid = (validForm: NewUserRequest) => {
    createUser(validForm);
  };

  useEffect(() => {
    data && data?.user && router.push('/');
    data?.ok && toast.success(data?.message);
  }, [data, data?.user, router]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white"
    >
      {error && <span>{new Error(error as any).message}</span>}
      {data?.message && <span>{data?.message}</span>}
      <h1 className="text-xl font-medium uppercase text-center mb-3">
        Create New Account
      </h1>
      <Input
        placeholder="name"
        name="name"
        register={register('name', { required: 'This field is required.' })}
        type="text"
        required={true}
        errorMessage={errors.name?.message || null}
      />
      <Input
        placeholder="email"
        name="email"
        register={register('email', { required: 'This field is required.' })}
        type="email"
        required={true}
        errorMessage={errors.email?.message || null}
      />
      <Input
        placeholder="password"
        name="password"
        register={register('password', { required: 'This field is required.' })}
        type="password"
        required={true}
        errorMessage={errors.password?.message || null}
      />
      <Button
        mode="CTA"
        addClass="w-full py-3"
        size="medium"
        loading={loading}
        disabled={!watch('name') && !watch('email') && !watch('password')}
      >
        Create
      </Button>
      <Button
        mode="neutral"
        addClass="w-full py-3"
        link="/auth/login"
        size="medium"
      >
        Login
      </Button>
      <div className="text-center text-xs text-stone-700 hover:text-amber-800">
        <Link href="/auth/forgot-password">Forgot Password</Link>
      </div>
    </form>
  );
}
