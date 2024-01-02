import { connectMongoDB } from "@/database/mongo.config";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    const checkPassword = await compare(password, user.password);
    console.info("the checkpassword is", checkPassword);
    if (!checkPassword || email !== user.email) {
      return NextResponse.json({ status: 501, message: "credentials Invalid" });
    }
    return NextResponse.json({
      status: 200,
      message: "User registered Successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 501, message: "Invalid credentials" });
  }
}
