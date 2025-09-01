"use client";

import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type Option = { value: string; text: string };

type FormData = {
  text: string;
  type: "TEXT" | "TEXTAREA" | "RADIO" | "CHECKBOX" | "CHECKBOX_GROUP" | "DATE";
  required: boolean;
  step: number;
  options: Option[];
};

type AddQuestionFormProps = {
  initialData?: FormData;
  questionId?: string;
  isUpdate?: boolean;
};

export default function AddQuestionForm({
  initialData,
  questionId,
  isUpdate = false,
}: AddQuestionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData || {
      text: "",
      type: "TEXT",
      required: false,
      step: 1,
      options: [{ value: "", text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const selectedType = watch("type");

  // Reset form if initialData changes (for update)
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    data.step = Number(data.step);

    // Validate options for RADIO or CHECKBOX_GROUP
    if (
      (data.type === "RADIO" || data.type === "CHECKBOX_GROUP") &&
      (!data.options || data.options.length === 0)
    ) {
      toast.error("At least one option is required");
      return;
    }

    try {
      if (isUpdate && questionId) {
        await axiosInstance.put(`/qus/${questionId}`, data);
        toast.success("Question updated successfully!");
      } else {
        await axiosInstance.post("/qus", data);
        toast.success("Question added successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save question");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isUpdate ? "Update Question" : "Add Question"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Question Text */}
        <div>
          <label className="block font-medium mb-1">Question Text</label>
          <input
            {...register("text", {
              required: "Question text is required",
              minLength: { value: 5, message: "Minimum 5 characters required" },
              maxLength: {
                value: 300,
                message: "Maximum 300 characters allowed",
              },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter question"
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            {...register("type", { required: "Select a question type" })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="TEXT">Text</option>
            <option value="TEXTAREA">Textarea</option>
            <option value="RADIO">Radio</option>
            <option value="CHECKBOX">Checkbox</option>
            <option value="CHECKBOX_GROUP">Checkbox Group</option>
            <option value="DATE">Date</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Required */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("required")} />
          <label>Required</label>
        </div>

        {/* Step */}
        <div>
          <label className="block font-medium mb-1">Step</label>
          <input
            type="number"
            {...register("step", {
              required: "Step is required",
              min: { value: 1, message: "Minimum step is 1" },
              max: { value: 6, message: "Maximum step is 6" },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.step && (
            <p className="text-red-500 text-sm mt-1">{errors.step.message}</p>
          )}
        </div>

        {/* Options */}
        {(selectedType === "RADIO" || selectedType === "CHECKBOX_GROUP") && (
          <div className="border p-3 rounded space-y-2">
            <label className="font-medium">Options</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  {...register(`options.${index}.value` as const, {
                    required: "Option value is required",
                  })}
                  placeholder="Value"
                  className="border rounded px-2 py-1 w-1/2"
                />
                <input
                  {...register(`options.${index}.text` as const, {
                    required: "Option text is required",
                  })}
                  placeholder="Text"
                  className="border rounded px-2 py-1 w-1/2"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: "", text: "" })}
              className="bg-sky-700 text-white px-3 py-1 rounded mt-2"
            >
              Add Option
            </button>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          {isUpdate ? "Update Question" : "Add Question"}
        </button>
      </form>
    </div>
  );
}
