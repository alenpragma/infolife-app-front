"use client";

import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { CheckboxField } from "@/components/form/fields/CheckboxField";
import { CheckboxGroupField } from "@/components/form/fields/CheckboxGroupField";
import { DateField } from "@/components/form/fields/DateField";
import { RadioGroupField } from "@/components/form/fields/RadioGroupField";
import { TextAreaField } from "@/components/form/fields/TextAreaField";
import { TextField } from "@/components/form/fields/TextField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"; // shadcn/toast
import { z, ZodType } from "zod";

type FieldOption = { value: string; text: string };

type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "radio" | "checkbox" | "checkboxGroup" | "date";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
};

export const DynamicForm = () => {
  const formRef = useRef<GenericFormRef<any>>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [schema, setSchema] = useState<ZodType<any>>(z.object({}));
  const [initialValues, setInitialValues] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFields() {
      try {
        const res = await axios.get("/api/form-fields");
        setFields(res.data);

        const shape: any = {};
        const initValues: any = {};

        res.data.forEach((f: Field) => {
          switch (f.type) {
            case "text":
            case "textarea":
              shape[f.name] = f.required
                ? z.string().min(1, `${f.label} is required`)
                : z.string().optional();
              initValues[f.name] = "";
              break;
            case "radio":
              shape[f.name] = f.required
                ? z.enum(
                    f.options!.map((o) => o.value) as [string, ...string[]],
                    {
                      errorMap: () => ({ message: `${f.label} is required` }),
                    }
                  )
                : z
                    .enum(
                      f.options!.map((o) => o.value) as [string, ...string[]]
                    )
                    .optional();
              initValues[f.name] = f.options?.[0]?.value || "";
              break;
            case "checkbox":
              shape[f.name] = f.required
                ? z
                    .boolean()
                    .refine((v) => v, { message: `${f.label} is required` })
                : z.boolean().optional();
              initValues[f.name] = false;
              break;
            case "checkboxGroup":
              shape[f.name] = z.array(z.string()).optional();
              initValues[f.name] = [];
              break;
            case "date":
              shape[f.name] = f.required
                ? z.coerce.date({ message: `${f.label} is required` })
                : z.coerce.date().optional();
              initValues[f.name] = new Date();
              break;
          }
        });

        setSchema(z.object(shape));
        setInitialValues(initValues);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load form fields");
      }
    }

    fetchFields();
  }, []);

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <TextField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "textarea":
        return (
          <TextAreaField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            autoResize
          />
        );
      case "radio":
        return (
          <RadioGroupField
            name={field.name}
            options={field.options!}
            required={field.required}
          />
        );
      case "checkbox":
        return (
          <CheckboxField
            name={field.name}
            label={field.label}
            required={field.required}
          />
        );
      case "checkboxGroup":
        return (
          <CheckboxGroupField
            name={field.name}
            label={field.label}
            options={field.options!}
          />
        );
      case "date":
        return (
          <DateField
            name={field.name}
            label={field.label}
            required={field.required}
          />
        );
      default:
        return null;
    }
  };

  if (fields.length === 0) return <p>Loading form...</p>;

  return (
    <Card className="bg-white shadow-xl rounded-2xl p-6 my-6 max-w-2xl mx-auto border">
      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
        📝 Student Registration Form
      </h2>

      <GenericForm
        schema={schema}
        initialValues={initialValues}
        ref={formRef}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            await axios.post("/api/submit-form", values);
            toast.success("Form submitted successfully 🎉");
            console.log(values);
          } catch (error) {
            toast.error("Failed to submit form ❌");
            console.error(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className="col-span-1">
              {renderField(f)}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full md:w-auto px-6 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </GenericForm>
    </Card>
  );
};
