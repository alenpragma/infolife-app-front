"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock data for submitted forms
const submittedForms = [
  {
    id: 1,
    teacherName: "মোহাম্মদ রহিম",
    grade: "মাধ্যমিক",
    submittedDate: "২৫ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
  {
    id: 2,
    teacherName: "ফাতেমা খাতুন",
    grade: "প্রাথমিক",
    submittedDate: "২৪ জানুয়ারি, ২০২৫",
    status: "পর্যালোচনায়",
  },
  {
    id: 3,
    teacherName: "আব্দুল করিম",
    grade: "মাধ্যমিক",
    submittedDate: "২৩ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
  {
    id: 4,
    teacherName: "রাশিদা বেগম",
    grade: "প্রাথমিক",
    submittedDate: "২২ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
  {
    id: 5,
    teacherName: "নাসির উদ্দিন",
    grade: "মাধ্যমিক",
    submittedDate: "২১ জানুয়ারি, ২০২৫",
    status: "পর্যালোচনায়",
  },
  {
    id: 6,
    teacherName: "সালমা আক্তার",
    grade: "প্রাথমিক",
    submittedDate: "২০ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
  {
    id: 7,
    teacherName: "মোস্তফা কামাল",
    grade: "মাধ্যমিক",
    submittedDate: "১৯ জানুয়ারি, ২০২৫",
    status: "সম্পূর্ণ",
  },
  {
    id: 8,
    teacherName: "রোকেয়া বেগম",
    grade: "প্রাথমিক",
    submittedDate: "১৮ জানুয়ারি, ২০২৫",
    status: "পর্যালোচনায়",
  },
];

export default function AllFormsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(submittedForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentForms = submittedForms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const exportToExcel = () => {
    // Mock export functionality
    alert("এক্সেল ফাইল ডাউনলোড শুরু হচ্ছে...");
  };

  const exportToPDF = () => {
    // Mock export functionality
    alert("পিডিএফ ফাইল ডাউনলোড শুরু হচ্ছে...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 flex items-center relative z-10">
        <Link href="/dashboard">
          <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/edulife-logo.png"
              alt="EDULIFE Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <div className="text-blue-600 font-bold text-lg">EDULIFE</div>
              <div className="text-xs text-gray-600 font-medium">
                IT INSTITUTE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">সব ফরম</h1>
          <p className="text-gray-600">জমা দেওয়া সকল ফর্মের তালিকা</p>
          {/* Added statistics display */}
          <div className="mt-4 grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">
                {submittedForms.length}
              </div>
              <div className="text-xs text-gray-600">মোট ফর্ম</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="text-2xl font-bold text-green-600">
                {submittedForms.filter((f) => f.status === "সম্পূর্ণ").length}
              </div>
              <div className="text-xs text-gray-600">সম্পূর্ণ ফর্ম</div>
            </div>
          </div>
        </div>

        {/* Added export buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
          <Button
            onClick={exportToExcel}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="text-sm">এক্সেল এ রপ্তানি</span>
          </Button>
          <Button
            onClick={exportToPDF}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">পিডিএফ এ রপ্তানি</span>
          </Button>
        </div>
      </div>

      {/* Forms List */}
      <div className="p-4 space-y-4 relative z-10 pb-24">
        {currentForms.map((form, index) => (
          <Card
            key={form.id}
            className="p-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800">
                    ফর্ম #{form.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      form.status === "সম্পূর্ণ"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {form.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {form.teacherName}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                    <span className="text-sm">{form.grade}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{form.submittedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Added pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-xl shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl shadow-lg transition-all duration-200 ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-blue-100"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-xl shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md z-20">
        <div className="grid grid-cols-3">
          <Link
            href="/dashboard"
            className="p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm font-medium">ফিরে যান</span>
          </Link>
          <Link
            href="/quiz"
            className="p-4 text-center hover:bg-blue-500 transition-colors duration-200"
          >
            <FileText className="w-6 h-6 mx-auto mb-1" />
            <span className="text-sm font-medium">নতুন ফরম</span>
          </Link>
          <div className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-1 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{submittedForms.length}</span>
            </div>
            <span className="text-sm font-medium">মোট ফর্ম</span>
          </div>
        </div>
      </div>
    </div>
  );
}
