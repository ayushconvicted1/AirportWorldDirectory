"use client";

import type { FC, ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import PhoneInput, {
  isPossiblePhoneNumber,
  type Value,
} from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Required for styling

// --- Type Definitions ---
interface ServiceType {
  _id: string;
  name: string;
}

interface FormDataState {
  companyName: string;
  primaryContact: string;
  phone: Value | "";
  address: string;
  serviceType: string;
  businessLicenseNumber: string;
  taxId: string;
  email: string;
}

interface SignupModalProps {
  onClose: () => void;
}

// Helper function to convert a file to a base64 string
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = (error) => reject(error);
  });

const serviceTypes = [
  "Concessions",
  "Ground Transportation",
  "Construction",
  "Aviation Support",
  "Technology",
  "Other",
];

// Signup Modal Component
export const SignupModal: FC<SignupModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormDataState>({
    companyName: "",
    primaryContact: "",
    phone: "",
    address: "",
    serviceType: "",
    businessLicenseNumber: "",
    taxId: "",
    email: "",
  });

  const [certifications, setCertifications] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: Value | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || "",
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertifications(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.phone && !isPossiblePhoneNumber(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const certificationsForApi = await Promise.all(
        certifications.map(async (file) => ({
          name: file.name,
          data: await fileToBase64(file),
          type: file.type,
        }))
      );

      const requestBody = { ...formData, certifications: certificationsForApi };

      const response = await fetch("/api/vendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // --- IMPROVED ERROR HANDLING ---
      if (!response.ok) {
        // Handle specific 404 error from our own server
        if (response.status === 404) {
          throw new Error(
            "API endpoint not found. Check the server route configuration."
          );
        }

        // Try to get a specific error message from the API's JSON response
        const errorBody = await response.json().catch(() => null); // Safely try to parse JSON
        const errorMessage =
          errorBody?.message ||
          `Request failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }
      // --- END OF IMPROVEMENT ---

      const result = await response.json();

      alert(
        result.message ||
          "Registration details submitted successfully. The admin will review your application."
      );
      onClose();
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(err.message || "An unknown error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative">
        <style jsx global>{`
          .phone-input-custom {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            background-color: #fff;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .phone-input-custom:focus-within {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          }
          .phone-input-custom .PhoneInputInput {
            flex: 1;
            min-width: 0;
            border: none;
            outline: none;
            background-color: transparent;
            padding: 0.75rem 0;
            font-size: 1rem;
            color: inherit;
          }
          .phone-input-custom .PhoneInputCountrySelectArrow {
            opacity: 0.5;
            margin-left: 0.25rem;
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-800 p-1 rounded-full border border-gray-500 hover:border-black"
        >
          <FaArrowLeft size={14} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Register Your Business
          </h2>
          <p className="text-gray-500 mb-6 text-sm text-center">
            Join our network of trusted service providers. Fill out the form
            below to get started.
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="primaryContact"
                type="text"
                placeholder="Primary Contact Name*"
                value={formData.primaryContact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <PhoneInput
                international
                defaultCountry="IN"
                placeholder="Enter phone number*"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
                className="phone-input-custom"
              />
              <input
                name="email"
                type="email"
                placeholder="Email ID*"
                value={formData.email}
                onChange={handleChange}
                className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="companyName"
                type="text"
                placeholder="Registered Business Name*"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  {" "}
                  Select Service Type*{" "}
                </option>
                {serviceTypes?.map((service, index) => (
                  <option key={index} value={service}>
                    {service}{" "}
                  </option>
                ))}
              </select>
              <input
                name="businessLicenseNumber"
                type="text"
                placeholder="Business License Number*"
                value={formData.businessLicenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                name="taxId"
                type="text"
                placeholder="Tax ID / GST No*"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="address"
                placeholder="Full Business Address*"
                value={formData.address}
                onChange={handleChange}
                className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
              <div className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg">
                <label
                  htmlFor="certifications-upload"
                  className="text-gray-600"
                >
                  {" "}
                  Upload Certifications (Optional){" "}
                </label>
                <input
                  id="certifications-upload"
                  name="certifications"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  multiple
                />
                {certifications.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    {" "}
                    {certifications.length} file(s) selected.{" "}
                  </p>
                )}
              </div>
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4"
                role="alert"
              >
                {" "}
                <strong className="font-bold">Error: </strong>{" "}
                <span className="block sm:inline">{error}</span>{" "}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {" "}
              {isLoading ? "Submitting..." : "Submit Registration"}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
