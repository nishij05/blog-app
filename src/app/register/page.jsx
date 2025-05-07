"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Header from "../../Components/Header";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/signup", formData);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      toast.success("Account created successfully!");

      // Clear form and redirect
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });

      setTimeout(() => {
        router.push("/"); // Change this path if needed
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error("Please fix the errors below.");
      } else {
        toast.error("Something went wrong. Try again.");
        console.log("Registration failed:", error);
      }
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="you@example.com"
          />
          {errors.email && (
            <small className="text-red-500">{errors.email}</small>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            className="block text-sm text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
          />
          {errors.password && (
            <small className="text-red-500">{errors.password}</small>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            className="block text-sm text-gray-700 mb-1"
            htmlFor="password2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirm your password"
          />
          {errors.password2 && (
            <small className="text-red-500">{errors.password2}</small>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="form-check text-center mt-6">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsCheckbox"
          />
          <label htmlFor="termsCheckbox" className="form-check-label">
            By continuing, I agree to the{" "}
            <a href="#" className="text-blue-600">
              terms of use
            </a>{" "}
            &{" "}
            <a href="#" className="text-blue-600">
              privacy policy
            </a>
            .
          </label>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Continue
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}
