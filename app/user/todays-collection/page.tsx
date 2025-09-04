"use client";

import { Card } from "@/components/ui/card";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { X } from "lucide-react";
import { useState } from "react";

// Mock data for today's collection statistics
const todaysStats = {
  totalCollected: 12,
  completedForms: 8,
  pendingForms: 4,
  totalTeachers: 25,
  collectionRate: 48, // percentage
  todaysTarget: 20,
};

export default function page() {
  const { data, isLoading, error } = useGetData<any>(
    ["my-submition"],
    "/answers/my-submition"
  );
  console.log(data?.data, "data");
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-40 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-10 animate-bounce delay-1000"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>
      {/* Header */}
      {/* Page Title */}
      <div className="p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            আজকের সংগ্রহ
          </h1>
          <p className="text-gray-600">আজকের ফর্ম সংগ্রহের পরিসংখ্যান</p>
        </div>
      </div>
      <div className="p-4 space-y-4 relative z-10">
        {/* Recent Collections */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-sm rounded-2xl border-0">
          {data.data.map((collection, i) => (
            <Card
              key={collection.id}
              className="p-4 bg-white rounded-xl shadow-sm cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedCollection(collection)}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 font-medium text-gray-800">
                  <div className="font-medium text-gray-800">{i + 1}</div>
                  {collection.name}
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(collection.createdAt).toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </Card>
      </div>
      {selectedCollection && (
        <div
          onClick={() => setSelectedCollection(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl w-11/12 max-w-lg p-6 relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedCollection(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">
              Answers for {selectedCollection.name}
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedCollection.surveyResponse.map((resp: any) => (
                <div key={resp.id} className="p-2 bg-gray-50 rounded-md">
                  <div className="font-semibold text-gray-700">
                    {resp.question.text}
                  </div>
                  <div className="text-gray-600">{resp.answerText || "-"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
