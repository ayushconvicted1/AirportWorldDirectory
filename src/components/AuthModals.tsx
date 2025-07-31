"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

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
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s
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
