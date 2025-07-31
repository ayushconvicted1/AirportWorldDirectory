// app/search/page.tsx
"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import RestaurantModal from "@/components/RestaurantModal";

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
  provider_id: string | null; // Added provider_id
}
interface ServiceType {
  _id: string;
  name: string;
  image: string;
}

// NEW: Provider data type (only non-sensitive fields)
interface Provider {
  provider_name: string;
  about: string;
  website?: string;
  contact_info: {
    email: string;
    phone: string;
  };
}

// Combined type for the selected item state
type SelectedItem = Business & { provider?: Provider };

// --- COMPONENTS ---
const ResultCard = ({
  item,
  onSelect,
}: {
  item: Business;
  onSelect: (item: Business) => void;
}) => (
  <article className="bg-white rounded-lg shadow-md overflow-hidden group h-full flex flex-col">
    <div className="relative h-48">
      <img
        src={
          item.images[0] ||
          "https://placehold.co/400x300/a0aec0/ffffff?text=Image"
        }
        alt={item.business_name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/400x300/a0aec0/ffffff?text=Image";
        }}
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800">{item.business_name}</h3>
      <div className="flex items-center my-1">
        {[...Array(Math.round(item.ratings))].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {[...Array(5 - Math.round(item.ratings))].map((_, i) => (
          <FaStar key={i} className="text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {item.ratings.toFixed(1)}
        </span>
      </div>
      <p className="text-gray-600 text-sm flex-grow">
        {item.address.addressLine}, {item.address.city}
      </p>
      <p className="text-sm mt-2">
        <span className="font-semibold">Open Till:</span>{" "}
        <span className="text-green-600 font-bold">{item.open_till}</span>
      </p>
      <button
        onClick={() => onSelect(item)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  </article>
);

function SearchResults() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [isProviderLoading, setIsProviderLoading] = useState(false);
  const [results, setResults] = useState<Business[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const airport = searchParams.get("airport");
  const service = searchParams.get("service");

  // Effect to fetch the service types for the header
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const res = await fetch(
          "https://ow91reoh80.execute-api.ap-south-1.amazonaws.com/air/service-types"
        );
        if (!res.ok) throw new Error("Failed to fetch service types");
        setServiceTypes(await res.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchServiceTypes();
  }, []);

  // Effect to fetch search results when params change
  useEffect(() => {
    if (!airport) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = new URL(
          "https://s4ltdt9g72.execute-api.ap-south-1.amazonaws.com/aviation"
        );
        url.searchParams.append("airport", airport);
        if (service) url.searchParams.append("service", service);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`An error occurred: ${res.statusText}`);
        setResults(await res.json());
      } catch (err: any) {
        setError(err.message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [airport, service]);

  // MODIFIED: This function now also fetches provider details
  const handleSelect = async (item: Business) => {
    // Open modal immediately with business data
    setSelectedItem(item);

    if (item.provider_id) {
      setIsProviderLoading(true);
      try {
        const res = await fetch(
          `https://s4ltdt9g72.execute-api.ap-south-1.amazonaws.com/aviation/providers/${item.provider_id}`
        );
        if (res.ok) {
          const providerData: Provider = await res.json();
          // Update the state with combined business and provider data
          setSelectedItem({ ...item, provider: providerData });
        }
      } catch (err) {
        console.error("Failed to fetch provider details:", err);
      } finally {
        setIsProviderLoading(false);
      }
    }
  };

  const handleCloseModal = () => setSelectedItem(null);

  const PageContent = () => {
    if (isLoading)
      return <div className="text-center py-10">Loading results...</div>;
    if (error)
      return (
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      );
    if (results.length === 0)
      return (
        <div className="text-center py-10">
          No results found for your search.
        </div>
      );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {results.map((item) => (
          <ResultCard key={item._id} item={item} onSelect={handleSelect} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 font-sans min-h-screen">
        <Header serviceTypes={serviceTypes} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {service ? `Showing "${service}"` : "All Services"} in{" "}
            {airport || "Airport"}
          </h1>
          {!airport ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">
                Please select an airport
              </h2>
              <p className="text-gray-500 mt-2">
                Use the search bar above to find services at your airport.
              </p>
            </div>
          ) : (
            <PageContent />
          )}
        </main>
      </div>
      <RestaurantModal
        item={selectedItem}
        onClose={handleCloseModal}
        isProviderLoading={isProviderLoading}
      />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading Page...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
