import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (user) {
        const db = await clientPromise;
        const collection = db.db().collection("users");
        const userFromDB = await collection.findOne({ email: user.email });
        if (userFromDB) {
          session.user.id = userFromDB._id.toString();
        }
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
