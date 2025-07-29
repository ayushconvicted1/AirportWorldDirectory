"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

// Login Modal Component
export const LoginModal = ({ onClose, onSwitchToSignup }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 p-1 rounded-full border border-gray-500 hover:border-black"
        >
          <FaArrowLeft size={14} />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Log In</h2>
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FcGoogle size={22} className="mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-blue-600 hover:bg-gray-50">
              <FaFacebook size={22} className="mr-2" />
              Facebook
            </button>
          </div>

          <div className="flex items-center w-full my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">
              Or continue with Email
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form className="w-full">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email ID*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Signup Modal Component
export const SignupModal = ({ onClose, onSwitchToLogin }: any) => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-15 max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 p-1 rounded-full border border-gray-500 hover:border-black"
        >
          <FaArrowLeft size={14} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Register Your Business
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>

          <form className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name e.g. Kaustav Roy*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone No e.g. +91-1234567890*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email ID e.g. Kaustav@gmail.com*"
                className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Registered Business Name*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Category*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="GST No*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Documents*
              </button>
              <input
                type="password"
                placeholder="Create Password*"
                className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Re-entre Password*"
                className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
