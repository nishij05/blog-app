import mongoose from "mongoose";
import dbConnect from "../../../../../lib/db";
import Blog from "../../../../../models/blogData";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await dbConnect();

    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

    console.log("TOKEN FROM HEADER:", token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const author = decoded._id;
    console.log("Author received on server:", author);
    const image = formData.get("image");

    let imagePath = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
      console.log("Image uploaded successfully!");
      imagePath = `/uploads/${fileName}`;
    }

    const newBlog = await Blog.create({
      title,
      content,
      category,
      author: author,
      image: imagePath,
    });
    

    console.log("Blog saved:", newBlog);

    return NextResponse.json({
      success: true,
      msg: "Blog added successfully!",
    });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return NextResponse.json(
      { success: false, msg: "Failed to add blog", error: error.message },
      { status: 500 }
    );
  }
}
