"use client";

import { handleLogout } from "@/lib/utils/useHandleLogout";
import { Home, LogOut, Plus } from "lucide-react";
import Link from "next/link";

const UserBottomNav = () => {
  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md z-20">
        <div className="grid grid-cols-3">
          <Link
            href="/user"
            prefetch={true}
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <button className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
              <span className="text-xs sm:text-sm font-medium">হোম</span>
            </button>
          </Link>

          <Link
            href="/user/new-form"
            prefetch={true}
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">নতুন ফরম</span>
          </Link>

          <button
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
            onClick={() => handleLogout()}
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">বাহির</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBottomNav;
