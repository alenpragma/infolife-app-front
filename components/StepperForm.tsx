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
import axiosInstance from "@/lib/axiosConfig/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z, ZodType } from "zod";

type FieldOption = { value: string; text: string };
type Field = {
  name: string;
  label: string;
  type: "TEXT" | "TEXTAREA" | "RADIO" | "CHECKBOX" | "CHECKBOX_GROUP" | "DATE";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  step: number; // API থেকে আসবে
};

type StepConfig = { step: number; title: string };

export const StepperForm = () => {
  const formRef = useRef<GenericFormRef<any>>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [schema, setSchema] = useState<ZodType<any>>(z.object({}));
  const [initialValues, setInitialValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [stepsConfig, setStepsConfig] = useState<StepConfig[]>([]);

  useEffect(() => {
    async function fetchFields() {
      try {
        const resp = await axiosInstance.get("/qus");
        const apiFields: Field[] = resp.data.data.map((q: any) => ({
          name: q.id, // unique identifier
          label: q.text,
          type: q.type, // TEXT -> text, RADIO -> radio
          required: q.required,
          placeholder: q.placeholder ?? "",
          options: q.options?.map((o: any) => ({
            value: o.value,
            text: o.text,
          })),
          step: q.step,
        }));

        setFields(apiFields);

        // Auto-generate steps dynamically
        const steps = Array.from(new Set(apiFields.map((f) => f.step))).sort(
          (a, b) => a - b
        );
        setStepsConfig(steps.map((s) => ({ step: s, title: `Step ${s}` })));

        // Generate Zod schema and initial values dynamically
        const shape: Record<string, any> = {};
        const initValues: Record<string, any> = {};

        apiFields.forEach((f) => {
          switch (f.type) {
            case "TEXT":
            case "TEXTAREA":
              shape[f.name] = f.required
                ? z.string().min(1, `${f.label} is required`)
                : z.string().optional();
              initValues[f.name] = "";
              break;
            case "RADIO":
              shape[f.name] = f.required
                ? z.enum(
                    f.options!.map((o) => o.value) as [string, ...string[]],
                    { errorMap: () => ({ message: `${f.label} is required` }) }
                  )
                : z
                    .enum(
                      f.options!.map((o) => o.value) as [string, ...string[]]
                    )
                    .optional();
              initValues[f.name] = "";
              break;
            case "CHECKBOX":
              shape[f.name] = f.required
                ? z
                    .boolean()
                    .refine((v) => v, { message: `${f.label} is required` })
                : z.boolean().optional();
              initValues[f.name] = false;
              break;
            case "CHECKBOX_GROUP":
              shape[f.name] = z.array(z.string()).optional();
              initValues[f.name] = [];
              break;
            case "DATE":
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
      case "TEXT":
        return (
          <TextField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      case "TEXTAREA":
        return (
          <TextAreaField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            autoResize
          />
        );
      case "RADIO":
        return (
          <RadioGroupField
            name={field.name}
            options={field.options!}
            required={field.required}
          />
        );
      case "CHECKBOX":
        return (
          <CheckboxField
            name={field.name}
            label={field.label}
            required={field.required}
          />
        );
      case "CHECKBOX_GROUP":
        return (
          <CheckboxGroupField
            name={field.name}
            label={field.label}
            options={field.options!}
          />
        );
      case "DATE":
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

  const handleNext = () => {
    const values = formRef.current?.getValues();
    // if (!values) return;

    // const parsed = schema.safeParse(values);
    // if (!parsed.success) {
    //   const formatted = parsed.error.format() as unknown as Record<
    //     string,
    //     { _errors: string[] }
    //   >;
    //   const stepErrors = fields.filter(
    //     (f) => f.step === step && formatted[f.name]?._errors?.length > 0
    //   );
    //   if (stepErrors.length > 0) {
    //     toast.error(
    //       `Please fill all required fields in step ${step}: ${stepErrors
    //         .map((f) => f.label)
    //         .join(", ")}`
    //     );
    //     return;
    //   }
    // }

    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  if (fields.length === 0) return <p>Loading form...</p>;

  return (
    <Card className="bg-white shadow-xl rounded-2xl p-6 my-6 max-w-2xl mx-auto border">
      {/* Step indicators */}
      <div className="flex justify-between mb-6">
        {stepsConfig.map((s) => (
          <div
            key={s.step}
            className={`flex-1 text-center text-sm font-medium ${
              s.step === step ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {s.title}
          </div>
        ))}
      </div>

      <GenericForm
        schema={schema}
        initialValues={initialValues}
        ref={formRef}
        onSubmit={async (values) => {
          const answers = Object.entries(values).map(
            ([questionId, answer]) => ({
              questionId,
              answer,
            })
          );

          try {
            setLoading(true);
            await axiosInstance.post("/qus/answer", answers);
            toast.success("Form submitted successfully 🎉");
          } catch (error) {
            toast.error("Failed to submit form ❌");
            console.error(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="space-y-4">
          {fields
            .filter((f) => f.step === step)
            .map((f) => (
              <div key={f.name}>{renderField(f)}</div>
            ))}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < stepsConfig.length ? (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </GenericForm>
    </Card>
  );
};
