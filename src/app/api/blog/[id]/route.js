import { NextResponse } from "next/server";
import Blog from "../../../../../models/blogData";
import dbConnect from "../../../../../lib/db";

// GET single blog
export async function GET(request, { params }) {
  const { id } = await params;

  await dbConnect();

  try {
    const blog = await Blog.findById(id).populate("author", "name");

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("Error fetching blog:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}


// PUT update blog
export async function PUT(request, { params }) {
  const { id } = await params;

  await dbConnect();

  const body = await request.json();

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, msg: "Update failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error("Error updating blog:", err.message);
    return NextResponse.json(
      { success: false, msg: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  const { id } = await params;

  await dbConnect();

  try {
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, msg: "Blog deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    return NextResponse.json(
      { success: false, msg: "Failed to delete" },
      { status: 500 }
    );
  }
}
