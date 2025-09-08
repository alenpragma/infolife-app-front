"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

type Option = { value: string; text: string };

type FormData = {
  text: string;
  type:
    | "TEXT"
    | "TEXTAREA"
    | "RADIO"
    | "SELECT"
    | "CHECKBOX"
    | "CHECKBOX_GROUP"
    | "DATE";
  required: boolean;
  step: number;
  options: Option[];
};

export default function SubQus({ qus }) {
  // console.log(qus, "qus");

  // -------------------------------------------------
  // {selectedType == "SELECT" && (
  //         <select>
  //           {fields.map((field, index) => (
  //             <option key={field.id} value={field.value}>
  //               {field.text || "(empty)"}
  //             </option>
  //           ))}
  //         </select>
  //       )}
  const renderField = (field) => {
    // console.log(field, "field");

    switch (field.type) {
      case "TEXT":
        return (
          <input
            type="text"
            {...register(field.id, { required: field.required })}
            className="border p-2 w-full rounded"
          />
        );

      case "SELECT":
        return (
          <select
            {...register(field.id, { required: field.required })}
            className="border p-2 w-full rounded"
          >
            {field.options?.map((opt, index) => (
              <option key={opt.id || index} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        );

      case "TEXTAREA":
        return (
          <textarea
            {...register(field.id, { required: field.required })}
            className="border p-2 w-full rounded"
          />
        );
      case "RADIO":
        return field.options.map((opt) => (
          <label key={opt.id || opt.value} className="block">
            <input
              type="radio"
              value={opt.value}
              {...register(field.id, { required: field.required })}
            />
            {opt.text}
          </label>
        ));
      case "CHECKBOX":
        return (
          <input
            type="checkbox"
            {...register(field.id, { required: field.required })}
          />
        );
      default:
        return null;
    }
  };
  // -------------------------------------------------
  // console.log(qus);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      text: "",
      type: "TEXT",
      required: false,
      step: 1,
      options: [{ value: "", text: "" }],
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const selectedType = watch("type");

  const onSubmit = async (data: FormData | any) => {
    const optionsWithValue = data.options?.map((opt: any) => ({
      value: opt.value || opt.text, // fallback to text
      text: opt.text,
    }));
    const selectedAnswer = data[qus.id];

    const payload = {
      text: data.text,
      step: Number(data.step),
      required: Boolean(data.required),
      type: data.type,
      dependsOnQuestionId: qus.id,
      dependsOnValue: selectedAnswer,
      options: optionsWithValue,
    };

    if (
      (data.type === "RADIO" || data.type === "CHECKBOX_GROUP") &&
      (!data.options || data.options.length === 0)
    ) {
      toast.error("At least one option is required");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/qus", payload);
      showSuccessAlert("Question added successfully!");
      router.push("/admin/questions");
      reset();
    } catch (err) {
      showErrorAlert("Failed to save question");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4">{questionData.title}</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div key={qus.id} className="flex flex-col">
          <label className="font-medium mb-1">
            {qus.text} {qus.required && "*"}
          </label>
          {renderField(qus)}
        </div>

        {(selectedType === "RADIO" || selectedType === "CHECKBOX_GROUP") && (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <label key={field.id} className="flex items-center gap-2">
                <input
                  type={selectedType === "RADIO" ? "radio" : "checkbox"}
                  {...register(`options.${index}.value`)}
                  value={field.value}
                />
                <span>{field.text || "(empty)"}</span>
              </label>
            ))}
          </div>
        )}

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
            <option value="SELECT">Select</option>
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
        {(selectedType === "RADIO" ||
          selectedType === "SELECT" ||
          selectedType === "CHECKBOX_GROUP") && (
          <div className="border p-3 rounded space-y-2">
            <label className="font-medium">Options</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
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
          disabled={loading}
          className={`${
            loading ? "bg-green-500" : "bg-green-600"
          } text-white px-4 py-2 rounded mt-4`}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
