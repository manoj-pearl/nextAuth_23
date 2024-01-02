import { connectMongoDB } from "@/database/mongo.config";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse) {
  try {
      const { name, email } = await request.json();
      await connectMongoDB();
    const result = await User.create({ name, email });
    console.log("result:::", result);
    return NextResponse.json(
      { message: "User Registered !!!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User not registeered successfully" },
      { status: 501 }
    );
  }
}
