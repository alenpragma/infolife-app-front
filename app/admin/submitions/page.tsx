"use client";

import PaginationButtons from "@/components/PaginationButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { url2 } from "@/lib/api";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import "jspdf-autotable";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
// import { DownloadTablePdf } from "./DownloadTableCSV";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setparePage] = useState(25);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  console.log(currentPage, "currentPage");

  const [meta, setMeta] = useState({
    total: 1,
    page: 1,
    limit: 1,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/answers/submition?page=${currentPage}&limit=${perPage}&searchTerm=${search}&fromDate=${fromDate}&toDate=${toDate}`
      );
      setData(res.data.data.data);
      setMeta(res?.data?.data?.meta);
      setSearch("");
      setSearch("");
      setFromDate("");
      setToDate("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // PDF ডাউনলোড
  const downloadPDF = async () => {
    const response = await fetch(
      `${url2}/pdf?page=${
        currentPage + 1
      }&limit=${perPage}&searchTerm=${search}&fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "123",
          name: "বাংলা নাম",
          details: "এই ডাটা PDF আকারে দেখানো হবে",
        }),
      }
    );

    if (!response.ok) throw new Error("PDF download failed");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-123.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submition</h2>
      <div>
        <button
          onClick={() => downloadPDF()}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Download PDF
        </button>

        {/* <DownloadTablePdf data={data} /> */}
        <div className="max-w-full flex   mb-4 relative">
          <div className="flex gap-2 mb-4 items-center">
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From Date"
            />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To Date"
            />
          </div>

          <div className="flex">
            <Input
              className="w-62"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className="border h-fit bg-success bg-sky-600 p-1 rounded-sm text-white"
              onClick={() => fetchUsers()}
            >
              Search
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full text-left bg-white/95 backdrop-blur-sm shadow-md rounded-2xl border-collapse">
          <thead>
            <tr>
              <th className="py-3 text-left">No</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Survey By</th>
              <th className="py-3 text-left">Guardian Name</th>
              <th className="py-3 text-left">Mobile</th>
              <th className="py-3 text-left">Alternative Mobile</th>
              <th className="py-3 text-left">Upazila</th>
              <th className="py-3 text-left">Area</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              const surveyResponse = d.surveyResponse || [];

              const guardian = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Guardian Name"
              );

              const mobile = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Mobile"
              );

              const altMobile = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Alternative Mobile"
              );

              const upjela = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Upazila"
              );

              const area = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Area"
              );

              const status = surveyResponse.find(
                (a: any) => a.question.text.trim() == "Status"
              );

              return (
                <tr key={d.id} className="border-b">
                  <td className="py-3 text-left px-5">
                    {(currentPage - 1) * perPage + (i + 1)}
                  </td>

                  <td className="py-3 text-left px-5">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-left px-5">
                    {d.user.email} <br /> {d.user.name}
                  </td>
                  <td className="py-3 text-left px-5">
                    {guardian?.answerText || "-"}
                  </td>
                  <td className="py-3 text-left px-5">
                    {mobile?.answerText || "-"}
                  </td>
                  <td className="py-3 text-left px-5">
                    {altMobile?.answerText || "-"}
                  </td>
                  <td className="py-3 text-left px-5">
                    {upjela?.answerText || "-"}
                  </td>
                  <td className="py-3 text-left px-5">
                    {area?.answerText || "-"}
                  </td>

                  <td className="py-3 text-left px-5">
                    {status?.answerText || "-"}
                  </td>
                  <td className="py-3 text-left px-5">
                    <Button size="sm" onClick={() => setSelectedCollection(d)}>
                      View All
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <PaginationButtons
          totalPages={Math?.ceil(meta?.total / perPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
