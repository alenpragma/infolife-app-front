"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import Link from "next/link";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  text: string;
  type: string;
  required: boolean;
  step: number;
};

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/qus");
        setQuestions(res.data.data); // assuming API returns { data: [...] }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-4 bg-white shadow rounded-lg border flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{q.text}</h3>
                <p className="text-sm text-gray-600">Type: {q.type}</p>
                <p className="text-sm text-gray-600">
                  Required: {q.required ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600">Step: {q.step}</p>
              </div>
              <div>
                <Link
                  href={`/admin/questions/${q.id}`} // redirect to update page
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
