"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setFormData((prev) => ({ ...prev, author: decoded._id }));
    } catch (err) {
      console.log("Invalid token:", err);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const addBlogData = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in.");
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("content", formData.content);
    formDataWithImage.append("category", formData.category);
    formDataWithImage.append("author", formData.author);

    if (imageFile) {
      formDataWithImage.append("image", imageFile);
    }

    try {
      const response = await axios.post("/api/blog/create", formDataWithImage, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blog Added Successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Blog
        </h1>

        <form onSubmit={addBlogData} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Article Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select a category</option>
              <option value="All">All</option>
              <option value="Technology">Technology</option>
              <option value="Startup">Startup</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Author
            </label>
            <input
              type="text"
              value={user?.name || "Loading..."}
              readOnly
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog here..."
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default AddBlog;
