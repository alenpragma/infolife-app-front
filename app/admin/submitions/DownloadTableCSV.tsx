const DownloadTableCSV = ({ data }: { data: any[] }) => {
  const handleDownload = () => {
    if (!data || !data.length) return;

    // Prepare CSV headers
    const headers = [
      "No",
      "Date",
      "Survey By",
      "Guardian Name",
      "Mobile",
      "Alternative Mobile",
      "Upazila",
      "Area",
    ];

    // Prepare CSV rows
    const rows = data.map((d, i) => {
      const surveyResponse = d.surveyResponse || [];

      const getAnswer = (q: string) =>
        surveyResponse.find((a: any) => a.question.text.trim() === q)
          ?.answerText || "-";

      return [
        i + 1,
        new Date(d.createdAt).toLocaleDateString(),
        `${d.user.email} / ${d.user.name}`,
        getAnswer("Guardian Name"),
        getAnswer("Mobile"),
        getAnswer("Alternative Mobile"),
        getAnswer("Upazila"),
        getAnswer("Area"),
      ];
    });

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(","))
      .join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "survey_data.csv");
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Download CSV
    </button>
  );
};

export default DownloadTableCSV;
