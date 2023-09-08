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
      profile(profile) {
        console.log("profile::::::", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          interests: ["tech", "music", "dance"],
        };
      },
    }),
  ],

  // for profile details to saved in the databse on the first login

  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, user }) {
      console.log("&&&&&&&&&&&&&", session);
      console.log("sssssssssssssssss", user);
      if (session?.user) {
        // const db = await clientPromise;
        // const collection = db.db().collection("users");
        // const userFromDB = await collection.findOne({ email: user.email });
        // if (userFromDB) {
        //   session.user.id = userFromDB._id.toString();
        session.user.id = user.id;
        session.user.interests = user.interests;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
