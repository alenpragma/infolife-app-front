"use client";

import AddQuestionForm from "@/app/admin/add-questions/page";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const resp = await axiosInstance.get(`/qus/${id}`);
        setInitialData(resp.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch question");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Question not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Question</h1>
      <AddQuestionForm
        initialData={initialData?.data}
        questionId={id as string}
        isUpdate
      />
    </div>
  );
}
