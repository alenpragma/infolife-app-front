"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const TopNav = () => {
  return (
    <>
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center relative z-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/edulife-logo.png"
              alt="EDULIFE Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
