import { connectMongoDB } from "@/database/mongo.config";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt-ts";


export async function POST(request:NextRequest) {
    const { name, email, password } = await request.json();
    await connectMongoDB();
    // check duplicate users
    const checkexisting = await User.findOne({ email });
    if (checkexisting)
      return NextResponse.json({ message: "User Already Exists...!" });
  
    const hashedPassword = await hash(password, 10);
    let userObj = {
      name,
      email,
      password: hashedPassword,
    };
  
    const user = await User.create(userObj)
    return NextResponse.json(
      { data: user, message: "User Registered" },
      { status: 201 }
    );
  }
  