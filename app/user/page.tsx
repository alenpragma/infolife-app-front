"use client";

import { ExitModal } from "@/components/exit-modal";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { BookOpen, Calendar, FileText, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showExitModal, setShowExitModal] = useState(false);

  const { data, isLoading, error } = useGetData<any>(["profile"], "/profile");

  if (isLoading) return <p>Loading...</p>;

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
        <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-sm rounded-md border-0 transform  transition-all duration-300">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
              <Image
                alt=""
                src={data.img}
                width={100}
                height={100}
                className="rounded-full"
              ></Image>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 truncate">
                {data?.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center mb-1">
                <span className="mr-2 text-blue-500">👤</span> {data?.position}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                <span className="mr-2 text-green-500">📍</span> {data?.location}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        {/* নতুন ফরম */}
        <Link href="/user/new-form">
          <Card className="group p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl border border-gray-100 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold pb-6 text-gray-800 text-base sm:text-lg">
                নতুন ফরম
              </p>
            </div>
          </Card>
        </Link>

        {/* আজকের সংগ্রহ */}
        <Link href="/user/todays-collection">
          <Card className="group p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl border border-gray-100 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                আজকের সংগ্রহ
              </p>
              <p className="mt-1 text-sm sm:text-base font-medium text-green-600">
                {data?.today} টি
              </p>
            </div>
          </Card>
        </Link>

        {/* সব ফরম */}
        <Link href="/user/all-forms">
          <Card className="group p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl border border-gray-100 hover:-translate-y-1">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
                <List className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <p className="font-semibold text-gray-800 text-base sm:text-lg">
                সব ফরম
              </p>
              <p className="mt-1 text-sm sm:text-base font-medium text-purple-600">
                {data?.total} টি
              </p>
            </div>
          </Card>
        </Link>

        {/* তত্ত্ব পাঠন */}
        <Card className="group p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl border border-gray-100 hover:-translate-y-1">
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              তত্ত্ব পাঠন
            </p>
            <p className="mt-1 text-sm sm:text-base font-medium text-purple-600"></p>
          </div>
        </Card>
      </div>

      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </div>
  );
}
