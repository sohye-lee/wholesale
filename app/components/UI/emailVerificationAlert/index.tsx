import Link from 'next/link';
import React from 'react';

export default function EmailVerificationAlert() {
  return (
    <div className="w-full mb-3 d p-4 bg-gray-200">
      <p className="w-full text-center text-sm">
        It seems like you did not verify your email. Get the verification link{' '}
        <Link href="" className="font-medium undeline">
          here
        </Link>
      </p>
    </div>
  );
}
