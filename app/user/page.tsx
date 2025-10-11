"use client";

import { ExitModal } from "@/components/exit-modal";
import SavedData from "@/components/SavedData";
import { Card } from "@/components/ui/card";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { BookOpen, Calendar, FileText, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showExitModal, setShowExitModal] = useState(false);
  const { data, isLoading } = useGetData<any>(["profile"], "/profile");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative pb-20 p-4 space-y-6">
        {/* Profile Skeleton */}
        <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-sm rounded-md border-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        </Card>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((_, i) => (
            <Card
              key={i}
              className="p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md rounded-xl border border-gray-100"
            >
              <div className="flex flex-col items-center space-y-4 animate-pulse">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative pb-20">
      {/* Animated Background */}
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
        <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-sm rounded-md border-0 transition-all duration-300">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden">
              <Image
                alt=""
                src={data?.img}
                width={100}
                height={100}
                className="rounded-full"
              />
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

      {/* Main Actions */}
      <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 relative z-10">
        <Link href="/user/new-form" prefetch>
          <DashboardCard
            icon={<FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
            title="নতুন ফরম"
            color="from-blue-500 to-blue-600"
          />
        </Link>

        <Link href="/user/todays-collection">
          <DashboardCard
            icon={<Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
            title="আজকের সংগ্রহ"
            color="from-green-500 to-green-600"
            count={data?.today}
          />
        </Link>

        <Link href="/user/all-forms">
          <DashboardCard
            icon={<List className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
            title="সব ফরম"
            color="from-purple-500 to-purple-600"
            count={data?.total}
          />
        </Link>

        <Link href="/user/save-message" prefetch>
          <DashboardCard
            icon={<BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
            title="তত্ত্ব পাঠন"
            color="from-orange-500 to-orange-600"
          />
        </Link>
      </div>

      <div>
        <SavedData />
      </div>

      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  color,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  count?: number;
}) {
  return (
    <Card className="group p-6 sm:p-8 bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl border border-gray-100 hover:-translate-y-1">
      <div className="text-center">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm`}
        >
          {icon}
        </div>
        <p className="font-semibold text-gray-800 text-base sm:text-lg">
          {title}
        </p>
        <p
          className={`${
            count ?? "pb-5"
          } mt-1 mb-4 text-sm sm:text-base font-medium text-purple-600`}
        >
          {count !== undefined && <span>{count} টি</span>}
        </p>
      </div>
    </Card>
  );
}
