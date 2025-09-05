"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { X } from "lucide-react"; // যদি icon ব্যবহার হয়
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/answers/submition");
      setData(res.data.data.data); // nested object অনুযায়ী
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
              <th className="py-3 px-5 text-left font-semibold">Submit by</th>
              <th className="py-3 px-5 text-left font-semibold">Survey user</th>
              <th className="py-3 px-5 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr
                key={d.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedCollection(d)}
              >
                <td className="py-3 px-5">
                  {d.user.email} <br />
                  {d.user.name}
                </td>
                <td className="py-3 px-5">{d.name}</td>
                <td className="py-3 px-5 text-blue-500 underline">
                  View Answers
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              Answers for {selectedCollection.user.name}
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedCollection?.surveyResponse?.map((resp: any) => (
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
      )}
    </div>
  );
};

export default Page;
