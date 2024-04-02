import NextAuth from "next-auth";
import connect from "@/db/connect";
import GithubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/db/mongodb";

import User from "@/db/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      connect();

      const currentUser = await User.findById(user.id);

      if (currentUser.friends == null) {
        currentUser.friends = [];
        currentUser.save();
      }

      return {
        ...session,
        user: { ...session.user, id: user.id, friends: user.friends },
      };
    },
  },
};

export default NextAuth(authOptions);
