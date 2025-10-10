"use client";

import PaginationButtons from "@/components/PaginationButtons";
import { Card } from "@/components/ui/card";
import ViewModal from "@/components/ViewModal";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { formatData } from "@/lib/utils/formatData";
import { Calendar, FileText, GraduationCap, User } from "lucide-react";
import { useState } from "react";

export default function AllFormsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 25;
  const [startDate, setStartDate] = useState<string>(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState<string>(""); // YYYY-MM-DD

  const { data, isLoading, error } = useGetData<any>(
    ["my-submition", currentPage, startDate, endDate],
    `/answers/my-submition?page=${currentPage + 1}&limit=${limit}${
      startDate ? `&fromDate=${startDate}` : ""
    }${endDate ? `&toDate=${endDate}` : ""}`
  );

  const [selectedCollection, setSelectedCollection] = useState<any>(null);

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

      <div className="mb-4 relative flex justify-center gap-2">
        <input
          type="date"
          value={startDate}
          max={endDate || undefined}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCurrentPage(0); // reset page
          }}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={endDate}
          min={startDate || undefined}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(0); // reset page
          }}
          className="border rounded px-2 py-1"
        />
        {/* ✅ Reset Button */}
        {(startDate || endDate) && (
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setCurrentPage(0);
            }}
            className="bg-primary hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* Forms List */}
      <div className="p-4 space-y-4 relative z-10 pb-24">
        {data?.data?.map((form, index) => {
          return (
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
                      <span className="text-sm font-medium">
                        {
                          form?.answerData?.find(
                            (item: any) => item?.questionText == "Guardian Name"
                          )?.answer
                        }
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                      <span className="text-sm">
                        {
                          form?.answerData?.find(
                            (item: any) => item?.questionText == "Mobile"
                          )?.answer
                        }
                      </span>
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
          );
        })}

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
