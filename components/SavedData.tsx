"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetData } from "@/lib/axiosConfig/FetchData";
import { useState } from "react";
import EditSurveyData from "./EditSurveyData";

interface ISaveData {
  id: string;
  title: string;
  description?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
}

const SavedData = () => {
  const [selected, setSelected] = useState<ISaveData | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { data, isLoading, error } = useGetData<any>(
    ["save-date"],
    "/save-date"
  );

  const handleView = (item: ISaveData) => {
    setSelected(item);
    setOpen(true);
  };

  const handleEdit = (item: ISaveData) => {
    setSelected(item);
    setOpenEdit(true);
  };
  console.log(data, "data");

  if (isLoading) return <p className="p-6 text-gray-600">Loading data...</p>;
  // if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div>
      <div className="p-6 space-y-6 relative">
        {/* <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Saved Data</h2>
        <Button onClick={fetchData} variant="outline">
          Refresh
        </Button>
      </div> */}

        <h3 className="font-semibold text-lg">সব তত্ত্ব</h3>

        {data.length === 0 ? (
          <p className="text-gray-500">No data found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.map((item) => (
              <Card
                key={item.id}
                className="p-4 shadow hover:shadow-md transition border cursor-pointer"
              >
                {/* <h3 className="font-semibold text-lg">Title: {item.title}</h3> */}

                <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                  Location: {item.location}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  Desc: {item.description || "No description available."}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleView(item)}>
                      View
                    </Button>
                    <Button size="sm" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 🔹 View Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Details</DialogTitle>
            </DialogHeader>

            {selected ? (
              <div className="space-y-2 text-sm text-gray-700">
                {/* <p>
                  <span className="font-medium">Title:</span> {selected.title}
                </p> */}
                {selected.description && (
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {selected.description}
                  </p>
                )}
                {selected.createdBy && (
                  <p>
                    <span className="font-medium">Created By:</span>{" "}
                    {selected.createdBy}
                  </p>
                )}
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
                {selected.updatedAt && (
                  <p>
                    <span className="font-medium">Updated At:</span>{" "}
                    {new Date(selected.updatedAt).toLocaleString()}
                  </p>
                )}
                {/* <hr className="my-3" /> */}
                {/* <p className="text-gray-600 font-medium">Raw JSON:</p> */}
                {/* <pre className="bg-gray-100 p-2 rounded-md overflow-auto text-xs">
                  {JSON.stringify(selected, null, 2)}
                </pre> */}
              </div>
            ) : (
              <p>No data selected.</p>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {openEdit && (
        <EditSurveyData
          open={openEdit}
          setOpen={setOpenEdit}
          selected={selected}
        />
      )}
    </div>
  );
};

export default SavedData;
