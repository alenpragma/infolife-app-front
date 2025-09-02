"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/answers");
      setData(res.data.data.data);
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
  console.log(data);

  return (
    <div>
      <h2>Answers</h2>
      <div className="space-y-4">
        {data.map((d) => (
          <div
            key={d.id}
            className="p-4 bg-white shadow rounded-lg border flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Question: {d?.question?.text}</p>
              <p className="text-sm text-gray-600">Answer: {d?.answerText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
