"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${blogId}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Failed to load blog:", err);
      }
    };
    if (blogId) fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blog/${blogId}`, blog);
      toast.success("Updated Successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Update failed.");
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <Toaster />
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Edit Blog Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog content"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="all">All</option>
              <option value="technology">Technology</option>
              <option value="startup">Startup</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
