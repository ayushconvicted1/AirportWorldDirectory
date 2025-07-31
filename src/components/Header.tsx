// @/components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

// --- TYPE DEFINITIONS ---
interface ServiceType {
  _id: string;
  name: string;
  image: string;
}
interface Airport {
  _id: string;
  name: string;
  city: string;
  country: string;
  iata_code: string;
}

// --- CUSTOM DEBOUNCE HOOK ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// --- CLIENT COMPONENTS ---
const Navbar = () => (
  <nav className="flex items-center justify-between py-6 px-4">
    <div className="text-2xl font-bold text-gray-800">
      {/* Your Logo Here */}
    </div>
    {/* <HeaderActions /> */}
  </nav>
);

// UPDATED: Hero component's search bar is now fully responsive
const Hero = ({ serviceTypes }: { serviceTypes: ServiceType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [airportQuery, setAirportQuery] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [airportResults, setAirportResults] = useState<Airport[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);
  const [isAirportLoading, setIsAirportLoading] = useState(false);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const debouncedAirportQuery = useDebounce(airportQuery, 500);

  // Effect to sync component state with URL parameters
  useEffect(() => {
    const currentService = searchParams.get("service");
    if (currentService) {
      setServiceQuery(decodeURIComponent(currentService));
    }
  }, [searchParams]);

  // Effect for fetching airport data
  useEffect(() => {
    if (debouncedAirportQuery.length < 3) {
      setAirportResults([]);
      setShowAirportDropdown(false);
      return;
    }
    const fetchAirports = async () => {
      setIsAirportLoading(true);
      try {
        // ✅ Changed to the local API route
        const res = await fetch(
          `/api/search-airports?query=${debouncedAirportQuery}`
        );
        setAirportResults(await res.json());
      } catch (error) {
        console.error("Failed to fetch airports:", error);
        setAirportResults([]);
      } finally {
        setIsAirportLoading(false);
      }
    };
    fetchAirports();
  }, [debouncedAirportQuery]);

  // Effect for filtering services
  useEffect(() => {
    if (serviceQuery) {
      setFilteredServices(
        serviceTypes.filter((s) =>
          s.name.toLowerCase().includes(serviceQuery.toLowerCase())
        )
      );
      setShowServiceDropdown(true);
    } else {
      setFilteredServices([]);
      setShowServiceDropdown(false);
    }
  }, [serviceQuery, serviceTypes]);

  // Effect to handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowAirportDropdown(false);
        setShowServiceDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const airportCode = selectedAirport
      ? selectedAirport.iata_code
      : searchParams.get("airport") || "";
    router.push(
      `/search?airport=${airportCode}&service=${encodeURIComponent(
        serviceQuery
      )}`
    );
  };

  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
        Explore The World
      </h1>
      {/* Responsive search container */}
      <div
        className="flex flex-col md:flex-row items-stretch md:items-start space-y-2 md:space-y-0 md:space-x-2 max-w-3xl mx-auto"
        ref={searchContainerRef}
      >
        {/* Airport Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search Airport (e.g., DEL)"
            value={airportQuery}
            onChange={(e) => {
              setAirportQuery(e.target.value);
              setSelectedAirport(null);
              setShowAirportDropdown(true);
            }}
            className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          {showAirportDropdown && airportQuery.length > 2 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-left">
              {isAirportLoading ? (
                <div className="p-3 text-gray-500">Loading...</div>
              ) : airportResults.length > 0 ? (
                airportResults.map((airport) => (
                  <div
                    key={airport._id}
                    onClick={() => {
                      setAirportQuery(airport.name);
                      setSelectedAirport(airport);
                      setShowAirportDropdown(false);
                    }}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-semibold">
                      {airport.name} ({airport.iata_code})
                    </p>
                    <p className="text-sm text-gray-600">
                      {airport.city}, {airport.country}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500">No results found.</div>
              )}
            </div>
          )}
        </div>
        {/* Service Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Explore Services"
            value={serviceQuery}
            onChange={(e) => setServiceQuery(e.target.value)}
            onFocus={() => setShowServiceDropdown(true)}
            className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          {showServiceDropdown && filteredServices.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-left">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  onClick={() => {
                    setServiceQuery(service.name);
                    setShowServiceDropdown(false);
                  }}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  {service.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 w-full md:w-auto flex justify-center"
        >
          <FaSearch size={24} />
        </button>
      </div>
    </div>
  );
};

export default function Header({
  serviceTypes,
}: {
  serviceTypes: ServiceType[];
}) {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4">
        <Navbar />
        <Hero serviceTypes={serviceTypes} />
      </div>
    </header>
  );
}
