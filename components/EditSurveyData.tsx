"use client";

import { GenericForm } from "@/components/form/GenericForm";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextAreaField } from "@/components/form/fields/TextAreaField";
import { TextField } from "@/components/form/fields/TextField";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { z } from "zod";

const surveyDataSchema = z.object({
  description: z.string().min(3, "Description is required"),
  rating: z.string().optional(),
  location: z.string().optional(),
  reviewDate: z.string().optional(),
});

interface EditSurveyDataProps {
  selected: any;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const EditSurveyData = ({ selected, open, setOpen }: EditSurveyDataProps) => {
  const formRef = useRef<any>(null);
  const queryClient = useQueryClient();

  // ✅ PATCH mutation
  const { mutate: updateSurveyData, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(`/save-date/${selected.id}`, data);
      return res.data;
    },
    onSuccess: (res) => {
      showSuccessAlert(res.message || "Updated successfully!");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["save-date"],
      });
    },
    onError: (err: any) => {
      showErrorAlert(err?.message || "Failed to update data");
    },
  });

  const handleSubmit = (data: any) => {
    updateSurveyData({
      ...data,
      rating: Number(data.rating),
    });
  };

  if (!selected) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Survey / Review</DialogTitle>
        </DialogHeader>

        <GenericForm
          schema={surveyDataSchema}
          initialValues={{
            description: selected.description || "",
            rating: selected.rating?.toString() || "5",
            location: selected.location || "",
          }}
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
              label="Update Survey"
              isLoading={isPending}
              loadingLabel="Updating..."
            />
          </div>
        </GenericForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditSurveyData;
