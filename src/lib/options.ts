import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!user) {
            throw new Error("No user found");
          }

          const verifyPassword = await bcryptjs.compare(
            credentials!.password,
            user?.password
          );

          if (!verifyPassword) {
            throw new Error("Incorrect Password");
          }

          const { email, fistName, id, lastName } = user;

          const sessionUser = {
            id,
            name: fistName + " " + lastName,
            email,
          };

          return sessionUser;
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
            throw new Error(error.message);
          }

          throw new Error("Unable to sign in");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name!;
        session.user.email = token.email!;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
