// app/page.tsx
import React from "react";
import { FaQrcode } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io5";
import Header from "@/components/Header";
import ServiceTypes from "@/components/ServiceTypes";
// NEW: Import Link for navigation in a Server Component
import Link from "next/link";

// --- TYPE DEFINITION ---
interface ServiceType {
  _id: string;
  name: string;
  image: string;
}

// --- API FETCHING FUNCTION ---
async function getServiceTypes(): Promise<ServiceType[]> {
  try {
    const res = await fetch(
      "https://ow91reoh80.execute-api.ap-south-1.amazonaws.com/air/service-types"
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}

// --- SERVER COMPONENTS ---

// UPDATED: MainContent now dynamically displays service types
const MainContent = ({ serviceTypes }: { serviceTypes: ServiceType[] }) => {
  // Take the first two services from the API to display in the cards
  const displayServices = serviceTypes.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
      {/* Main Promo Card */}
      <div className="relative h-[24rem] rounded-lg overflow-hidden group shadow-lg">
        <img
          src="/HeroImg1.png"
          alt="Airplane wing over clouds"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-[35%] left-8 text-white pl-[6%]">
          <h2 className="text-4xl font-bold">Airport World Directory</h2>
        </div>
      </div>

      {/* Dynamic Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayServices.map((service) => (
          <div
            key={service._id}
            className="relative h-[24rem] sm:h-auto rounded-lg overflow-hidden group shadow-lg"
          >
            <img
              src={service.image} // Dynamic image
              alt={service.name} // Dynamic alt text
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col pt-[18%] text-white p-4 max-w-[75%]">
              <h3 className="text-4xl font-semibold leading-[50px]">
                Find {service.name} Near You {/* Dynamic title */}
              </h3>
              {/* This Link navigates to the search page with the service pre-selected */}
              <Link
                href={`/search?service=${encodeURIComponent(service.name)}`}
                passHref
              >
                <button className="mt-3 max-w-[150px] bg-white text-gray-800 bg-opacity-30 backdrop-blur-sm px-5 py-2 rounded-md text-sm font-medium hover:bg-opacity-40 transition-colors">
                  View All
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// UPDATED: AppPromo is now fully responsive
const AppPromo = () => (
  <div className="my-16 w-full bg-blue-600 relative pt-10 pb-10 lg:pt-16 lg:pb-12">
    <div className="container mx-auto flex items-center justify-between p-6 lg:p-10 flex-wrap">
      {/* Content */}
      <div className="flex items-center space-x-4 sm:space-x-8 mb-8 lg:mb-0 z-10 w-full lg:w-auto">
        <div className="bg-white p-2 rounded-lg shadow-lg flex-shrink-0">
          <FaQrcode size={100} className="text-black" />
        </div>
        <div className="text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">Get The App</h2>
          <p className="text-base sm:text-lg mt-1">Explore the world</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <button className="flex items-center bg-white text-black px-4 py-2 rounded-lg space-x-2 hover:bg-gray-200 transition-colors shadow-lg">
              <FaGooglePlay size={24} />
              <div>
                <p className="text-xs text-left">GET IT ON</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </button>
            <button className="flex items-center bg-white text-black px-4 py-2 rounded-lg space-x-2 hover:bg-gray-200 transition-colors shadow-lg">
              <IoLogoApple size={28} />
              <div>
                <p className="text-xs text-left">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Phone Image: Hidden on mobile (screens smaller than lg) to avoid clutter */}
      <div className="hidden lg:block absolute right-[5%] -bottom-16 z-0">
        <img
          src="/PhoneIcon.png"
          alt="App screenshot on a phone"
          className="h-[480px]"
        />
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT (Server Component) ---
export default async function HomePage() {
  const serviceTypes = await getServiceTypes();
  return (
    <div className="bg-white font-sans">
      <Header serviceTypes={serviceTypes} />
      <div className="container mx-auto px-4">
        {/* Pass serviceTypes to the updated MainContent component */}
        <MainContent serviceTypes={serviceTypes} />
        <ServiceTypes serviceTypes={serviceTypes} />
      </div>
      <AppPromo />
    </div>
  );
}
