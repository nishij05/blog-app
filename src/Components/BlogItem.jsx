"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function BlogItem() {
  const [showData, setShowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token.replace("Bearer ", ""));
        setUserName(decoded.name);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog/get");
      setShowData(response.data.blogList);
      setFilteredData(response.data.blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    setFilteredData(
      category === "All"
        ? showData
        : showData.filter((blog) => blog.category === category)
    );
  };

  return (
    <div className="px-4 md:px-12 lg:px-28 py-10 bg-gray-50">
      {/* Intro Section */}
      <div className="text-center my-8">
        <h2 className="text-3xl sm:text-5xl font-medium">
          Publish your passions, your way
        </h2>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Create a unique and beautiful blog easily.
        </p>
        {userName ? (
          <Link href="/admin/addBlog">
            <button className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-orange-500 transition mt-10">
              Create your blog
            </button>
          </Link>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-red-500 transition mt-10"
          >
            Create your blog
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`py-2 px-5 rounded-full text-sm font-medium transition-colors border 
              ${
                activeCategory === category
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-black hover:text-white"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <span className="inline-block px-3 py-1 mb-2 bg-black text-white text-xs rounded-full">
                {item.category}
              </span>
              <h5 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {item.title}
              </h5>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {item.content}
              </p>
              <Link href={`/blog/${item._id}`}>
                <button className="mt-3 px-4 py-2 bg-black text-white rounded-full hover:bg-orange-500 transition">
                  Read More →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
