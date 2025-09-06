"use client";

import { X } from "lucide-react";

const ViewModal = ({ selectedCollection, setSelectedCollection }: any) => {
  return (
    <div>
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
            Answers for {selectedCollection?.name}
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedCollection?.surveyResponse.map((resp: any) => (
              <div key={resp?.id} className="p-2 bg-gray-50 rounded-md">
                <div className="font-semibold text-gray-700">
                  {resp?.question.text}
                </div>
                <div className="text-gray-600">{resp?.answerText || "-"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
