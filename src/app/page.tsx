import Image from "next/image";
import React from "react";
import { FaSearch, FaQrcode } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io5";
import HeaderActions from "@/components/HeaderActions"; // Import the client component

// --- SERVER COMPONENTS ---

const Navbar = () => (
  <nav className="flex items-center justify-between py-6 px-4">
    <div className="text-2xl font-bold text-gray-800">
      {/* Logo can go here */}
    </div>
    {/* The interactive part of the navbar is now its own component */}
    <HeaderActions />
  </nav>
);

const Hero = () => (
  <div className="py-12">
    <h1 className="text-5xl font-bold text-gray-800 mb-8">Explore The World</h1>
    <div className="flex justify-center items-center space-x-2 rounded-lg max-w-2xl">
      <input
        type="text"
        placeholder="Search Airport"
        className="px-4 py-2 w-1/3 border border-gray-300  focus:border-blue-600"
      />
      <input
        type="text"
        placeholder="Explore Services"
        className="px-4 py-2 w-2/3 border border-gray-300  focus:border-blue-600"
      />
      <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
        <FaSearch size={20} />
      </button>
    </div>
  </div>
);
// Main Content Cards
// This section was updated to place the two smaller cards horizontally next to each other,
// as you requested, instead of vertically.
const MainContent = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
    {/* Large Card */}
    <div className="relative h-[24rem] rounded-sm overflow-hidden group shadow-lg">
      <img
        src="/HeroImg1.png"
        alt="Airplane wing over clouds"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute bottom-[35%] left-8 text-white pl-[6%]">
        <h2 className="text-4xl font-bold">Lorem Ipsum</h2>
        <button className="mt-4 bg-white text-gray-800 px-6 py-2 rounded-sm font-semibold hover:bg-gray-200 transition-colors">
          Check Updates
        </button>
      </div>
    </div>

    {/* Small Cards Container */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="relative h-[24rem] sm:h-auto rounded-sm overflow-hidden group shadow-lg">
        <img
          src="/HeroImg2.png"
          alt="Restaurant interior"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col pt-[18%] text-white p-4 max-w-[55%]">
          <h3 className="text-4xl font-semibold leading-[50px]">
            Find Restaurants Near You
          </h3>
          <button className="mt-3 max-w-[150px] mb-[25px] bg-white text-gray-800 bg-opacity-30 backdrop-blur-sm px-5 py-2 rounded-sm text-sm font-medium hover:bg-opacity-40 transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="relative h-[24rem] sm:h-auto rounded-sm overflow-hidden group shadow-lg">
        <img
          src="/HeroImg3.png"
          alt="SPA center with flowers"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col pt-[18%] text-white p-4 max-w-[55%]">
          <h3 className="text-4xl font-semibold leading-[50px]">
            Spa Centres Near You
          </h3>
          <button className="mt-3 max-w-[150px] bg-white text-gray-800 bg-opacity-30 backdrop-blur-sm px-5 py-2 rounded-sm text-sm font-medium hover:bg-opacity-40 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Category Section
// This was updated to use images instead of icons to perfectly match the design.
const Categories = () => {
  const categories = [
    {
      name: "Cafe",
      img: "/CafeIcon.png",
    },
    {
      name: "Restaurant",
      img: "/RestaurantIcon.png",
    },
    {
      name: "SPA Centre",
      img: "/SpaIcon.png",
    },
    {
      name: "Barber Shop",
      img: "/BarberIcon.png",
    },
    {
      name: "Cab Services",
      img: "/CabIcon.png",
    },
    {
      name: "Antique Shop",
      img: "/AntiqueIcon.png",
    },
    {
      name: "Clothing Stores",
      img: "/ClothingIcon.png",
    },
    {
      name: "Wine Shop",
      img: "/WineIcon.png",
    },
  ];

  return (
    <div className="py-12 my-8 bg-gray-50 rounded-xl px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center space-y-3 text-gray-700 hover:text-blue-600 cursor-pointer group"
          >
            <div className="w-28 h-28 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold">{cat.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          View All
        </button>
      </div>
    </div>
  );
};

// App Promotion Section
// The download buttons are now styled with a white background to match the image.
const AppPromo = () => (
  <div className="my-16 w-full bg-blue-600 relative pt-[4%] pb-[2%]">
    <div className="container mx-auto flex items-center justify-between p-10 flex-wrap">
      <div className="flex items-center space-x-8 mb-8 lg:mb-0">
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <FaQrcode size={120} className="text-black" />
        </div>
        <div className="text-white">
          <h2 className="text-4xl font-bold">Get The App</h2>
          <p className="text-lg mt-1">Explore the world</p>
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
      <div className="flex-shrink-0">
        <img
          src="/PhoneIcon.png"
          alt="App screenshot on a phone"
          className="h-[480px] absolute right-[10%] -top-15"
        />
      </div>
    </div>
  </div>
);

// Main Page Component
// This component assembles all the sections into the final page.
export default function HomePage() {
  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto">
        <Navbar />
        <Hero />
        <MainContent />
        <Categories />
      </div>
      <AppPromo />
    </div>
  );
}
