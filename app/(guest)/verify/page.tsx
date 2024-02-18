'use client';
import Button from '@/app/components/UI/button/button';
import Container from '@/app/components/UI/container/container';
import Loading from '@/app/components/loading';
import useRequest from '@/app/hooks/useRequest';
import { notFound, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function VerifyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Container width="small">
        <Verify />
      </Container>
    </Suspense>
  );
}

function Verify() {
  const params = useSearchParams();
  const userId = params.get('userId');
  const token = params.get('token');
  const [verifyToken, { data, error, loading }] = useRequest(
    `/api/users/verify`,
    'POST'
  );

  if (!userId || !token) return notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    verifyToken({
      userId,
      token,
    });
    // error && toast.error(new Error(error as any).message);
    data?.error && toast.error(data?.error);
    data?.ok && toast.success(data?.message);
  }, [data?.error, data?.message, data?.ok, token, userId, verifyToken]);
  return (
    // <Suspense fallback={<Loading />}>
    //   <Container width="small">
    <div className=" h-[calc(100vh-260px)] w-full flex items-center justify-center">
      {loading ? (
        <h3 className="text-xl font-medium text-center animate-pulse">
          Please wait...
          <br />
          we are verifying your account.
        </h3>
      ) : (
        <h3 className="text-xl font-medium text-center">
          {data?.message || data?.error}
          {data?.ok && (
            <Button
              size="small"
              mode="neutral"
              button={false}
              link="/auth/login"
              addClass="mt-4"
            >
              Login
            </Button>
          )}
        </h3>
      )}
    </div>
    //   </Container>
    // </Suspense>
  );
}
