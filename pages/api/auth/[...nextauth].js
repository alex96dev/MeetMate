import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";

import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/db/mongodb";

import dbConnect from "@/db/connect";

import User from "@/db/models/User";

export default NextAuth({
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return {
              id: 1,
              name: "J Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            };
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,

          clientSecret: process.env.GITHUB_SECRET,
        }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  //   callbacks: {
  //     async session({ session, user }) {
  //       dbConnect();

  //       const currentUser = await User.findById(user.id);

  //       if (currentUser.favoritePonies == null) {
  //         currentUser.favoritePonies = [];

  //         currentUser.save();
  //       }

  //       return { ...session, user: { ...session.user, id: user.id } };
  //     },
  //   },
});
