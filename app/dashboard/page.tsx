"use client";

import { ExitModal } from "@/components/exit-modal";
import { Card } from "@/components/ui/card";
import { handleLogout } from "@/lib/utils/useHandleLogout";
import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  List,
  LogOut,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-10 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      <div className="p-3 sm:p-4 relative z-10">
        <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0 transform  transition-all duration-300">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-xl sm:text-2xl">
                র
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 truncate">
                তোফাজ্জল হোসেন রাসেল
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center mb-1">
                <span className="mr-2 text-blue-500">👤</span> ব্রাঞ্চ ম্যানেজার
              </p>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                <span className="mr-2 text-green-500">📍</span> লক্ষ্মীপুর সদর
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        <Link href="/quiz">
          <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform   hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                নতুন ফরম
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/todays-collection">
          <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform   hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                আজকের সংগ্রহ
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/all-forms">
          <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform   hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <List className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                সব ফরম
              </p>
            </div>
          </Card>
        </Link>

        <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 transform   hover:-translate-y-1">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              তত্ত্ব পাঠন
            </p>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl z-20">
        <div className="grid grid-cols-3">
          <button className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">হোম</span>
          </button>
          <Link
            href="/test"
            prefetch={true} // 👈 সাথে সাথে preload হবে
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">নতুন ফরম</span>
          </Link>

          {/* <Link
            href="/quiz"
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">নতুন ফরম</span>
          </Link> */}

          <button
            className="p-3 sm:p-4 text-center hover:bg-blue-500 transition-colors duration-200"
            onClick={() => handleLogout()}
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
            <span className="text-xs sm:text-sm font-medium">বাহির</span>
          </button>
        </div>
      </div>

      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </div>
  );
}
