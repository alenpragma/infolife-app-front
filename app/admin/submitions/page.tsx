"use client";

import PaginationButtons from "@/components/PaginationButtons";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { formatData } from "@/lib/utils/formatData";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [meta, setMeta] = useState({
    total: 1,
    page: 1,
    limit: 1,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/answers/submition?page=${
          currentPage + 1
        }&limit=${perPage}&searchTerm=${search}&fromDate=${fromDate}&toDate=${toDate}`
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

  const generatePDF = (data: any[]) => {
    if (!data.length) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Survey Submissions", 14, 22);

    // Headers
    const headers = [
      "Submit by",
      "Survey user",
      ...data[0].surveyResponse.map((resp: any) => resp.question.text),
    ];

    // Rows
    const rows = data.map((d) => [
      `${d.user.email} (${d.user.name})`,
      d.name,
      ...d.surveyResponse.map((resp: any) => resp.answerText || "-"),
    ]);

    // Add table using autoTable
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [30, 144, 255] },
    });

    // Open PDF in new tab
    doc.output("dataurlnewwindow");

    // Download PDF (optional)
    // doc.save("survey_submissions.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submition</h2>
      <div>
        <button
          onClick={() => generatePDF(data)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          View / Download PDF
        </button>
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
        <table className="min-w-full bg-white/95 backdrop-blur-sm shadow-md rounded-2xl border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-5">No</th>
              <th className="py-3 px-5">Date</th>
              <th className="py-3 px-5">Submit by</th>
              <th className="py-3 px-5">Survey user</th>
              {data[0]?.surveyResponse?.map((resp: any) => (
                <th key={resp.id} className="py-3 px-5">
                  {resp.question.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.id} className="border-b">
                <td className="py-3 px-5">{i + 1}</td>
                <td className="py-3 px-5">{formatData(d.createdAt)}</td>

                <td className="py-3 px-5">
                  {d.user.email} <br /> {d.user.name}
                </td>
                <td className="py-3 px-5">{d.name}</td>
                {d.surveyResponse?.map((resp: any) => (
                  <td key={resp.id} className="py-3 px-5">
                    {resp.answerText || "-"}
                  </td>
                ))}
              </tr>
            ))}
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
