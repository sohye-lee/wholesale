import { UserDocument } from '@/app/lib/types';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: UserDocument;
  }
  // interface User extends UserDocument {
  //   role: string;
  // }
}
