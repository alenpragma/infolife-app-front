"use client";

import SubQus from "@/components/admin/SubQus";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [qus, setQus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const resp = await axiosInstance.get(`/qus/${id}`);
        setQus(resp.data.data);
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
  if (!qus) return <p>Question not found</p>;

  console.log(qus);

  return (
    <div>
      <SubQus qus={qus} />
    </div>
  );
};

export default page;
