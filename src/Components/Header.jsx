"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Header() {
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    toast.success("Logout Successfully!");
    router.push("/login");
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/blog.png"
            alt="Blogger image"
            width={50}
            height={50}
            className="w-[130px] sm:w-auto"
          />
        </Link>

        {userName ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 font-bold text-sm text-gray-700">
                  Welcome, {userName}
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="flex items-center gap-2 font-medium py-2 px-5 border border-black rounded-full hover:bg-black hover:text-white transition">
              Sign In
            </button>
          </Link>
        )}
      </div>

      <Toaster />
    </div>
  );
}
