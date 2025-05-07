import { NextResponse } from "next/server";
import Blog from "../../../../../models/blogData";
import dbConnect from "../../../../../lib/db";
import { jwtDecode } from "jwt-decode";

export async function GET(request) {
  try {
    await dbConnect();
    const authHeader = request.headers.get("authorization");
    console.log("Authorization header:", authHeader);

    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token:", token);

    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      if (!decoded || !decoded._id) {
        return NextResponse.json(
          { success: false, msg: "Invalid token" },
          { status: 401 }
        );
      }

      const userId = decoded._id;
      const blogs = await Blog.find({ author: userId });
      console.log("Fetched user's blogs:", blogs);

      return NextResponse.json({ success: true, blogList: blogs });
    }

    const blogs = await Blog.find();
    console.log("Fetched all blogs:");

    return NextResponse.json({ success: true, blogList: blogs });
  } catch (err) {
    console.log("Error fetching blogs:", err.message);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
