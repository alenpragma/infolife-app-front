"use client";
import Link from "next/link";

import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

type Question = {
  id: string;
  text: string;
  type: string;
  required: boolean;
  step: number;
};

export default function Page() {
  // try {
  //   questions = await getQuestions();
  // } catch (error) {
  //   return <p className="text-red-500">Failed to fetch questions</p>;
  // }

  const { data, isLoading, error } = useGetData<any>(["qus"], "/qus");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (datas: string) => {
      const response = await axiosInstance.delete<any>(`/qus/${datas}`);
      return response.data;
    },
    onSuccess: (data: any) => {
      showSuccessAlert(data.message);
      queryClient.invalidateQueries({
        queryKey: ["qus"],
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

  if (isPending) {
    return <p className="p-6">No questions found.</p>;
  }

  return (
    <div className="p-2 lg:p-6">
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      <div className="space-y-4">
        {data
          ?.sort((a, b) => a.step - b.step || a.serial - b.serial)
          ?.map((q) => (
            <div
              key={q.id}
              className="p-4 gap-4 bg-white shadow rounded-lg border flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{q.text}</h3>
                <p className="text-sm text-gray-600">Type: {q.type}</p>
                <p className="text-sm text-gray-600">
                  Required: {q.required ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">Step: {q.step}</p>
                <p className="text-sm text-gray-600">Serial: {q?.serial}</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-2">
                {(q.type == "RADIO" ||
                  q.type == "CHECKBOX" ||
                  q.type == "SELECT") && (
                  <Link
                    href={`/admin/add-sub-questions/${q.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Add sub qus
                  </Link>
                )}

                <Link
                  href={`/admin/questions/${q.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="cursor-pointer border border-red-600 p-1 rounded-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
