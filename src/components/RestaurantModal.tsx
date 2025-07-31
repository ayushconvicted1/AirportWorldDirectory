// @/components/RestaurantModal.tsx
"use client";

import React, { useState } from "react";
import {
  IoArrowBack,
  IoShareOutline,
  IoStar,
  IoStarOutline,
  IoGlobeOutline,
  IoMailOutline,
} from "react-icons/io5";

// --- TYPE DEFINITIONS ---
interface Business {
  _id: string;
  business_name: string;
  open_till: string;
  airport: string;
  ratings: number;
  images: string[];
  contact_number: string;
  address: {
    addressLine: string;
    city: string;
    state: string;
    country: string;
  };
  provider_id: string | null;
}

interface Provider {
  provider_name: string;
  about: string;
  website?: string;
  contact_info: { email: string; phone: string };
}

type SelectedItem = Business & { provider?: Provider };

// MODIFIED: Props now include isProviderLoading
export default function RestaurantModal({
  item,
  onClose,
  isProviderLoading,
}: {
  item: SelectedItem | null;
  onClose: () => void;
  isProviderLoading: boolean;
}) {
  const [rating, setRating] = useState(0);
  if (!item) return null;

  const roundedRating = Math.round(item.ratings);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-60 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-white rounded-full p-2 z-20 shadow-md hover:bg-gray-100 transition-colors"
        >
          <IoArrowBack size={24} />
        </button>
        <div className="relative h-64">
          <img
            src={item.images[0]}
            alt={`Photo of ${item.business_name}`}
            className="w-full h-full object-cover rounded-t-2xl"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x300/a0aec0/ffffff?text=Restaurant";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                {item.business_name}
              </h2>
              <div className="flex items-center mt-2 flex-wrap">
                <div className="flex items-center">
                  {[...Array(roundedRating)].map((_, i) => (
                    <IoStar
                      key={`star-filled-${i}`}
                      className="text-yellow-400"
                    />
                  ))}
                  {[...Array(5 - roundedRating)].map((_, i) => (
                    <IoStarOutline
                      key={`star-empty-${i}`}
                      className="text-gray-300"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({item.ratings.toFixed(1)} rating)
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="text-right flex-shrink-0">
              <p className="text-sm text-gray-500 mb-2">Click To Rate</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <button key={i} onClick={() => setRating(i + 1)}>
                    {i < rating ? (
                      <IoStar
                        className="text-yellow-400 cursor-pointer"
                        size={24}
                      />
                    ) : (
                      <IoStarOutline
                        className="text-gray-400 cursor-pointer"
                        size={24}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div> */}
          </div>

          <div className="my-6 pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
              <div>
                <p className="font-semibold">Status</p>
                <p>Open until {item.open_till}</p>
              </div>
              <div>
                <p className="font-semibold">Airport Code</p>
                <p>{item.airport}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-semibold">Address</p>
                <p>{`${item.address.addressLine}, ${item.address.city}, ${item.address.state}`}</p>
              </div>
              <div>
                <p className="font-semibold">Contact</p>
                <p>{item.contact_number}</p>
              </div>
            </div>
          </div>

          {/* --- NEW: Service Provider Section --- */}
          {item.provider_id && (
            <div className="my-6 pt-6 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Service Provider
              </h3>
              {isProviderLoading ? (
                <p className="text-gray-600">Loading provider details...</p>
              ) : item.provider ? (
                <div className="space-y-4">
                  <p className="text-xl font-semibold text-gray-800">
                    {item.provider.provider_name}
                  </p>
                  <p className="text-gray-600">{item.provider.about}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {item.provider.website && (
                      <a
                        href={item.provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <IoGlobeOutline /> Website
                      </a>
                    )}
                    <a
                      href={`mailto:${item.provider.contact_info.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <IoMailOutline /> Email
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Provider details could not be loaded.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
