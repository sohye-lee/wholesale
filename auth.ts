import { SessionUserProfile } from "@app/lib/types";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInCredential, UserDocument } from "./app/lib/types";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as SignInCredential;
        console.log("auth email:", email);
        console.log("auth pw:", password);
        const data = await fetch(
          `${process.env.HOST || process.env.NEXTAUTH_URL}/api/users/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());

        if (!data?.ok) {
          return null;
        }
        console.log("auth data user:", data?.user);
        return data?.user;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token = { ...params.token, ...params.user };
      }
      return params.token;
    },
    async session(params) {
      const user = params.token as typeof params.token & SessionUserProfile;
      if (user) {
        params.session.user = {
          ...params.session.user,
          _id: user?._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          avatar: user.avatar,
          role: user.role,
        };
      }
      return params.session;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
