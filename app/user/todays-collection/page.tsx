"use client";

import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { Card } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, Trash, X } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

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
  const queryClient = useQueryClient();
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const { data, isLoading, error } = useGetData<any>(
    ["my-submition-today"],
    "/answers/my-submition?day=true"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (datas: string) => {
      const response = await axiosInstance.delete<any>(
        `/answers/delete-my-submition/${datas}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      showSuccessAlert(data.message);
      queryClient.invalidateQueries({
        queryKey: ["my-submition-today"],
      });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err?.message || "Login failed.");
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

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
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow rounded-sm border-0">
          {data.data.map((collection, i) => (
            <Card
              key={collection.id}
              className="p-4 bg-white rounded-xl shadow-sm cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 font-medium text-gray-800">
                  <div className="font-medium text-gray-800">{i + 1}</div>
                  {collection.name}
                </div>

                <div className="text-sm flex gap-5 text-gray-500">
                  {new Date(collection.createdAt).toLocaleString()}
                  <div className="flex gap-3">
                    <Trash
                      onClick={() => handleDelete(collection?.id)}
                      className="w-8 h-8 text-red-600"
                    />
                    <Eye
                      onClick={() => setSelectedCollection(collection)}
                      className="w-8 h-8 text-blue-600"
                    />
                  </div>
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
