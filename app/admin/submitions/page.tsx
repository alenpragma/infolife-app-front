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
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.id} className="p-4 bg-white shadow rounded-lg border">
            <p className="font-semibold">Name: {d?.name}</p>

            <div className="mt-2 space-y-2">
              {d.surveyResponse?.map((s: any) => (
                <div key={s.id} className="p-2 border rounded">
                  <p>
                    <span className="font-medium">Question: </span>{" "}
                    {s.question.text}
                  </p>
                  <p>
                    <span className="font-medium">Answer: </span>{" "}
                    {s.answerText || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
