"use client";

import PaginationButtons from "@/components/PaginationButtons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ViewModal from "@/components/ViewModal";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { formatData } from "@/lib/utils/formatData";
import {
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";
import { useState } from "react";

export default function AllFormsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 25;

  const { data, isLoading, error } = useGetData<any>(
    ["my-submition", currentPage],
    `/answers/my-submition?page=${currentPage + 1}&limit=${limit}`
  );

  const exportToExcel = () => {
    // Mock export functionality
    alert("এক্সেল ফাইল ডাউনলোড শুরু হচ্ছে...");
  };

  const exportToPDF = () => {
    // Mock export functionality
    alert("পিডিএফ ফাইল ডাউনলোড শুরু হচ্ছে...");
  };
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  console.log(selectedCollection);

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

      <div className="p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">সব ফরম</h1>
          <p className="text-gray-600">জমা দেওয়া সকল ফর্মের তালিকা</p>

          <div className="mt-4 gap-4 max-w-sm mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {data?.data?.length}
              </div>
              <div className="text-xs text-gray-600">মোট ফর্ম</div>
            </div>
          </div>
        </div>

        {/* Added export buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
          <Button
            onClick={exportToExcel}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="text-sm">এক্সেল এ রপ্তানি</span>
          </Button>
          <Button
            onClick={exportToPDF}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">পিডিএফ এ রপ্তানি</span>
          </Button>
        </div>
      </div>

      {/* Forms List */}
      <div className="p-4 space-y-4 relative z-10 pb-24">
        {data?.data.map((form, index) => (
          <Card
            key={form.id}
            onClick={() => setSelectedCollection(form)}
            className="p-6 bg-white/95 backdrop-blur-sm shadow-sm rounded-2xl border-0 transform  transition-all duration-300 "
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-sm flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800">
                    ফর্ম #{index + 1}
                  </h3>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{form.name}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                    <span className="text-sm">{form.name}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span className="text-sm">
                      {formatData(form?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        <PaginationButtons
          totalPages={Math?.ceil(data?.meta?.total / limit)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {selectedCollection && (
        <ViewModal
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />
      )}
    </div>
  );
}
