import { connectMongoDB } from "@/database/mongo.config";
import { User } from "@/models/User";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }:any) {
        if (account?.provider === "google" || "github") {
          const { name, email } = user;
          try {
            await connectMongoDB();
            const userExists = await User.findOne({ email });
            console.log("userExists:::",userExists)
            if (!userExists) {
              const res = await fetch("http://localhost:3000/api/auth/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                }),
              });
              if (res.ok) {
                return user;
              }
            }
          } catch (error) {
            console.log(error);
            return NextResponse.json(
              { message: "Invalid Credentials" },
              { status: 501 }
            );
          }
        }
        return user;
      },
  },
  secret:process.env.NEXTAUTH_SCERET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Next Auth",
      credentials: {
        email: {
          label: "Emnail",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        try {
          connectMongoDB();
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            console.log("user signIn:::", user);
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
};
