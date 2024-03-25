import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/db/mongodb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,

      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
