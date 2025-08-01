// @/components/ServiceTypes.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

// --- TYPE DEFINITION ---
interface ServiceType {
  _id: string;
  name: string;
  image: string;
}

// --- MODAL COMPONENT ---
const ServiceTypesModal = ({
  isOpen,
  onClose,
  serviceTypes,
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceTypes: ServiceType[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] relative">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            All Service Types
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {serviceTypes.map((service) => (
              <Link
                key={service._id}
                href={`/search?service=${encodeURIComponent(service.name)}`}
                onClick={onClose} // Close modal on selection
                className="flex flex-col items-center space-y-3 text-gray-700 hover:text-blue-600 cursor-pointer group"
              >
                <div className="w-28 h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-center">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function ServiceTypes({
  serviceTypes,
}: {
  serviceTypes: ServiceType[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showViewAllButton = serviceTypes.length > 6;

  // Show first 5 items, leaving the 6th slot for the "View All" button
  const displayedServices = showViewAllButton
    ? serviceTypes.slice(0, 5)
    : serviceTypes;

  return (
    <div className="py-12 my-8 bg-gray-50 rounded-xl px-4">
      <div className="flex items-center justify-between px-[6%] flex-wrap">
        {displayedServices.map((service) => (
          <Link
            key={service._id}
            href={`/search?service=${encodeURIComponent(service.name)}`}
            className="flex flex-col items-center space-y-3 text-gray-700 hover:text-blue-600 cursor-pointer group"
          >
            <div className="w-28 h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-center">
              {service.name}
            </span>
          </Link>
        ))}
      </div>
      {showViewAllButton && (
        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All
          </button>
        </div>
      )}
      <ServiceTypesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTypes={serviceTypes}
      />
    </div>
  );
}
