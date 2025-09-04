"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/answers/submition");
      setData(res.data.data.data); // তোমার API অনুযায়ী nested object থেকে নিতে হবে
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submition</h2>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white/95 backdrop-blur-sm shadow-md rounded-2xl border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-5 text-left font-semibold">Name</th>
              <th className="py-3 px-5 text-left font-semibold">Question</th>
              <th className="py-3 px-5 text-left font-semibold">Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) =>
              d.surveyResponse?.map((s: any) => (
                <tr
                  key={s.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-3 px-5">{d.name}</td>
                  <td className="py-3 px-5">{s.question.text}</td>
                  <td className="py-3 px-5">{s.answerText || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
