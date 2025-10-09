"use client";

import { GenericForm } from "@/components/form/GenericForm";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextAreaField } from "@/components/form/fields/TextAreaField";
import { TextField } from "@/components/form/fields/TextField";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { z } from "zod";

// ✅ Zod validation schema based on SurveyData model
const surveyDataSchema = z.object({
  description: z.string().min(3, "Description is required"),
  rating: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 5,
      {
        message: "Rating must be between 1 and 5",
      }
    ),
  location: z.string().optional(),
  reviewDate: z.string().optional(),
});

// ✅ Initial form values
const initialValues = {
  description: "",
  rating: "5",
  location: "",
  reviewDate: "",
};

const Page = () => {
  const formRef = useRef<any>(null);
  const router = useRouter();

  // ✅ Mutation hook for form submit
  const { mutate: createSurveyData, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/save-date", data); // 👈 match your backend route
      return res.data;
    },
    onSuccess: (res) => {
      showSuccessAlert(res.message);
      formRef.current?.reset();
    },
    onError: (err: any) => {
      showErrorAlert(err?.message || "Something went wrong");
    },
  });

  // ✅ Form submit handler
  const handleSubmit = (data: any) => {
    createSurveyData({
      ...data,
      rating: Number(data.rating),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Submit Your Review / Survey
      </h2>

      <GenericForm
        schema={surveyDataSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="space-y-4">
          <TextAreaField
            name="description"
            label="Description"
            placeholder="Write your feedback or review..."
            resizable={true}
            autoResize={true}
          />

          <TextField
            name="rating"
            label="Rating (1-5)"
            type="number"
            placeholder="Enter your rating"
          />

          <TextField
            name="location"
            label="Location"
            placeholder="Enter your location (optional)"
          />

          <SubmitButton
            width="full"
            label="Submit Survey"
            isLoading={isPending}
            loadingLabel="Submitting..."
          />
        </div>
      </GenericForm>
    </div>
  );
};

export default Page;
