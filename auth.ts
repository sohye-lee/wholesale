import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInCredential, UserDocument } from "./app/lib/types";
import { JWT } from "next-auth/jwt";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        // leave empty as I'm using my own UI
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as SignInCredential;
        const data = await fetch(`${process.env.HOST}/api/users/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then(async (res) => await res.json());

        if (data?.ok && (data?.user as UserDocument)) {
          // Any object returned will be saved in `user` property of the JWT
          return data?.user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return data?.message;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params) {},
    async session(params) {},
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
