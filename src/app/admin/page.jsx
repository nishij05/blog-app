"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function Page() {
  const [blogList, setBlogList] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("/api/blog/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userBlogs = response.data.blogList;
      // console.log(userBlogs);

      setBlogList(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`/api/blog/${id}`);
      toast.success("Blog deleted!");
      fetchData(); // refresh
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-16 py-10">
        <Toaster />
        <h1 className="text-3xl font-bold text-center mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                {item.content}
              </p>

              <div className="flex justify-between gap-2 mt-4">
                <Link href={`/admin/editBlog/${item._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
