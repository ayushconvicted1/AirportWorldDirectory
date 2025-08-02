"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStore,
  FaUserCircle,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// Ensure this path is correct for your project
import { SignupModal } from "./AuthModals";

// --- TYPE DEFINITIONS ---
export interface ServiceType {
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

// --- PROPS INTERFACE ---
interface HeaderProps {
  serviceTypes: ServiceType[];
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

// --- MAIN HEADER COMPONENT ---
export default function Header({ serviceTypes }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // --- STATE DECLARATIONS ---
  const [modal, setModal] = useState<"signup" | null>(null);
  const [airportQuery, setAirportQuery] = useState<string>("");
  const [serviceQuery, setServiceQuery] = useState<string>("");
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [airportResults, setAirportResults] = useState<Airport[]>([]);
  // **FIX:** Added the missing state declaration for filteredServices
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);
  const [isAirportLoading, setIsAirportLoading] = useState<boolean>(false);
  const [showAirportDropdown, setShowAirportDropdown] =
    useState<boolean>(false);
  const [showServiceDropdown, setShowServiceDropdown] =
    useState<boolean>(false);
  const debouncedAirportQuery = useDebounce(airportQuery, 500);

  const closeModal = () => setModal(null);
  const openSignupModal = () => setModal("signup");

  // --- EFFECTS ---

  // Syncs service input with URL parameters on page load
  useEffect(() => {
    const currentService = searchParams.get("service");
    if (currentService) {
      setServiceQuery(decodeURIComponent(currentService));
    }
  }, [searchParams]);

  // Fetches airport data based on debounced user input
  useEffect(() => {
    const isSelectionMatchingQuery =
      selectedAirport &&
      airportQuery === `${selectedAirport.name} (${selectedAirport.iata_code})`;

    if (isSelectionMatchingQuery || debouncedAirportQuery.length < 3) {
      setAirportResults([]);
      if (isSelectionMatchingQuery) {
        setShowAirportDropdown(false);
      }
      return;
    }

    const fetchAirports = async () => {
      setIsAirportLoading(true);
      try {
        const res = await fetch(
          `/api/search-airports?query=${debouncedAirportQuery}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Airport[] = await res.json();
        setAirportResults(data);
        setShowAirportDropdown(true);
      } catch (error) {
        console.error("Failed to fetch airports:", error);
        setAirportResults([]);
      } finally {
        setIsAirportLoading(false);
      }
    };
    fetchAirports();
  }, [debouncedAirportQuery, airportQuery, selectedAirport]);

  // Filters the list of services based on user input
  useEffect(() => {
    if (serviceQuery && serviceTypes) {
      setFilteredServices(
        serviceTypes.filter((s) =>
          s.name.toLowerCase().includes(serviceQuery.toLowerCase())
        )
      );
    } else {
      setFilteredServices([]);
      setShowServiceDropdown(false);
    }
  }, [serviceQuery, serviceTypes]);

  // Handles clicks outside the search container to close dropdowns
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

  // --- HANDLER FUNCTIONS ---

  const handleSearch = () => {
    const airportCode =
      selectedAirport?.iata_code || searchParams.get("airport") || "";
    if (!airportCode || !serviceQuery) {
      alert("Please select an airport and specify a service.");
      return;
    }
    router.push(
      `/search?airport=${airportCode}&service=${encodeURIComponent(
        serviceQuery
      )}`
    );
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 gap-x-6">
            <div className="order-1">
              <Link
                href="/"
                className="text-xl font-bold text-blue-600 tracking-tight"
              >
                Airport Directory World
              </Link>
            </div>

            <div className="order-2 md:order-3 flex items-center space-x-6">
              <button
                onClick={openSignupModal}
                className="flex items-center text-sm font-medium px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                <FaUserCircle className="mr-2" />
                Register as Vendor
              </button>
            </div>

            <div
              ref={searchContainerRef}
              className="w-full md:flex-1 order-3 md:order-2"
            >
              <div className="flex items-stretch w-full bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <div className="relative flex-1 flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 ml-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Airport (e.g., DEL)"
                    value={airportQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setAirportQuery(e.target.value);
                      setSelectedAirport(null);
                    }}
                    onFocus={() => {
                      if (airportQuery.length >= 3)
                        setShowAirportDropdown(true);
                      setShowServiceDropdown(false);
                    }}
                    className="w-full pl-3 pr-4 py-2.5 bg-transparent text-gray-800 focus:outline-none"
                  />
                  {showAirportDropdown && (
                    <div className="absolute top-full left-0 z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
                      {isAirportLoading ? (
                        <div className="p-3 text-gray-500">Loading...</div>
                      ) : airportResults.length > 0 ? (
                        airportResults.map((airport) => (
                          <div
                            key={airport._id}
                            onClick={() => {
                              setSelectedAirport(airport);
                              setAirportQuery(
                                `${airport.name} (${airport.iata_code})`
                              );
                              setShowAirportDropdown(false);
                            }}
                            className="p-3 hover:bg-blue-50 cursor-pointer"
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
                        <div className="p-3 text-gray-500">
                          No results found.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-px bg-gray-200"></div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Explore Services (e.g., Lounge)"
                    value={serviceQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setServiceQuery(e.target.value)
                    }
                    onFocus={() => {
                      setShowServiceDropdown(true);
                      setShowAirportDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 bg-transparent text-gray-800 focus:outline-none"
                  />
                  {showServiceDropdown && (
                    <div className="absolute top-full left-0 z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto text-left">
                      {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                          <div
                            key={service._id}
                            onClick={() => {
                              setServiceQuery(service.name);
                              setShowServiceDropdown(false);
                            }}
                            className="p-3 hover:bg-blue-50 cursor-pointer"
                          >
                            {service.name}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-400">
                          Type to search for services.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-5 hover:bg-blue-700 transition-colors flex items-center justify-center rounded-r-md"
                  aria-label="Search"
                >
                  <FaSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {modal === "signup" && <SignupModal onClose={closeModal} />}
    </>
  );
}
