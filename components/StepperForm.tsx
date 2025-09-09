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
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z, ZodType } from "zod";
import { SelectField } from "./form/fields/SelectField";
import { showErrorAlert, showSuccessAlert } from "./toast/ToastSuccess";

type FieldOption = { value: string; text: string };

export type Field = {
  id: string;
  name: string;
  label: string;
  type:
    | "TEXT"
    | "TEXTAREA"
    | "RADIO"
    | "CHECKBOX"
    | "CHECKBOX_GROUP"
    | "DATE"
    | "SELECT_GROUP"
    | "SELECT";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  step: number;
  dependsOnQuestionId?: string | null;
  dependsOnValue?: string | null;
};

type StepConfig = { step: number; title: string };

// Component to watch form values for conditional rendering
const FormWatcher = ({
  renderField,
  fields,
  step,
  onValuesChange,
}: {
  renderField: (field: Field, values: any) => any | null;
  fields: Field[];
  step: number;
  onValuesChange: (values: any) => void;
}) => {
  const { control } = useFormContext();
  const watchedValues = useWatch({ control });

  useEffect(() => {
    onValuesChange(watchedValues);
  }, [watchedValues, onValuesChange]);

  return (
    <div className="space-y-4">
      {fields
        .filter((f) => f.step === step)
        .map((f) => (
          <div key={f.name}>{renderField(f, watchedValues)}</div>
        ))}
    </div>
  );
};

export const StepperForm = () => {
  const formRef = useRef<GenericFormRef<any>>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [schema, setSchema] = useState<ZodType<any>>(z.object({}));
  const [initialValues, setInitialValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [stepsConfig, setStepsConfig] = useState<StepConfig[]>([]);
  const [currentValues, setCurrentValues] = useState<any>({});

  useEffect(() => {
    async function fetchFields() {
      try {
        setLoading(true);
        const resp = await axiosInstance.get("/qus");
        const apiFields: Field[] = resp.data.data
          .map((q: any) => ({
            id: q.id,
            name: q.id,
            label: q.text,
            type: q.type,
            required: q.required,
            placeholder: q.placeholder ?? "",
            options: q.options?.map((o: any) => ({
              value: o.value,
              text: o.text,
              parent: o.parent,
            })),
            step: Number(q.step), // ensure number
            dependsOnQuestionId: q.dependsOnQuestionId,
            dependsOnValue: q.dependsOnValue,
            createdAt: q.createdAt, // ensure API returns this field
            serial: q?.serial ?? 100, // ensure number
          }))
          .sort((a, b) => a.step - b.step || a.serial - b.serial); // sort by step first, then serial

        setFields(apiFields);

        const steps = Array.from(new Set(apiFields.map((f) => f.step))).sort(
          (a, b) => a - b
        );
        setStepsConfig(steps.map((s) => ({ step: s, title: `Step ${s}` })));

        // Create initial values for all fields
        const initValues: Record<string, any> = {};
        apiFields.forEach((f) => {
          switch (f.type) {
            case "TEXT":
            case "TEXTAREA":
              initValues[f.name] = "";
              break;
            case "RADIO":
              initValues[f.name] = "";
              break;
            case "CHECKBOX":
              initValues[f.name] = false;
              break;
            case "CHECKBOX_GROUP":
              initValues[f.name] = [];
              break;
            case "DATE":
              initValues[f.name] = null;
              break;
            case "SELECT_GROUP":
              initValues[f.name] = f.options?.[0]?.value || "";
              // initValues[f.name] = "";

              break;
            case "SELECT":
              // initValues[f.name] = f.options?.[0]?.value || "";
              initValues[f.name] = "";

              break;
          }
        });

        setInitialValues(initValues);
        setCurrentValues(initValues); // Initialize currentValues with initialValues
      } catch (error) {
        console.error(error);
        toast.error("Failed to load form fields");
      } finally {
        setLoading(false);
      }
    }
    fetchFields();
  }, []);

  // Check if a field should be visible based on dependencies
  const isFieldVisible = (field: Field, values: any): boolean => {
    if (!field.dependsOnQuestionId || !field.dependsOnValue) {
      return true;
    }

    const parentValue = values[field.dependsOnQuestionId];
    return parentValue === field.dependsOnValue;
  };

  // Check if a field should be required based on visibility and required flag
  const isFieldRequired = (field: Field, values: any): boolean => {
    if (!isFieldVisible(field, values)) return false;
    return !!field.required;
  };

  // Create initial validation schema (without dependency checks)
  const createInitialSchema = (fields: Field[]): ZodType<any> => {
    const shape: Record<string, any> = {};

    fields.forEach((f) => {
      // For initial schema, only check if field is required (ignore dependencies)
      if (f.required) {
        switch (f.type) {
          case "TEXT":
          case "TEXTAREA":
            shape[f.name] = z.string().min(1, `${f.label} is required`);
            break;
          case "RADIO":
            shape[f.name] = z.enum(
              f.options!.map((o) => o.value) as [string, ...string[]],
              { errorMap: () => ({ message: `${f.label} is required` }) }
            );
            break;
          case "CHECKBOX":
            shape[f.name] = z
              .boolean()
              .refine((v) => v, { message: `${f.label} is required` });
            break;
          case "CHECKBOX_GROUP":
            shape[f.name] = z
              .array(z.string())
              .min(1, `${f.label} requires at least one selection`);
            break;
          case "DATE":
            shape[f.name] = z.coerce.date({
              message: `${f.label} is required`,
            });
            break;
          case "SELECT_GROUP":
            if (f.required) {
              shape[f.name] = z.string().min(1, `${f.label} is required`);
            } else {
              shape[f.name] = z.string().optional().or(z.literal(""));
            }
            break;
          case "SELECT":
            if (f.required) {
              shape[f.name] = z.string().min(1, `${f.label} is required`);
            } else {
              shape[f.name] = z.string().optional().or(z.literal(""));
            }
            break;
        }
      } else {
        switch (f.type) {
          case "TEXT":
          case "TEXTAREA":
            shape[f.name] = z.string().optional();
            break;
          case "RADIO":
            shape[f.name] = z
              .enum(f.options!.map((o) => o.value) as [string, ...string[]])
              .optional()
              .or(z.literal(""));
            break;
          case "CHECKBOX":
            shape[f.name] = z.boolean().optional();
            break;
          case "CHECKBOX_GROUP":
            shape[f.name] = z.array(z.string()).optional();
            break;
          case "DATE":
            shape[f.name] = z.coerce.date().optional().or(z.literal(null));
            break;
          case "SELECT_GROUP":
            shape[f.name] = z.string().optional().or(z.literal(""));
            break;
          case "SELECT":
            shape[f.name] = z.string().optional().or(z.literal(""));
            break;
        }
      }
    });

    return z.object(shape);
  };

  // Update schema whenever current values change
  useEffect(() => {
    if (fields.length === 0) return;

    // If we don't have current values yet, use initial schema
    if (Object.keys(currentValues).length === 0) {
      const initialSchema = createInitialSchema(fields);
      setSchema(initialSchema);
      return;
    }

    const shape: Record<string, any> = {};

    fields.forEach((f) => {
      // Check if field should be visible and required
      const shouldBeRequired = isFieldRequired(f, currentValues);

      if (shouldBeRequired) {
        // Field is visible and required - add validation
        switch (f.type) {
          case "TEXT":
          case "TEXTAREA":
            shape[f.name] = z.string().min(1, `${f.label} is required`);
            break;
          case "RADIO":
            shape[f.name] = z.enum(
              f.options!.map((o) => o.value) as [string, ...string[]],
              { errorMap: () => ({ message: `${f.label} is required` }) }
            );
            break;
          case "CHECKBOX":
            shape[f.name] = z
              .boolean()
              .refine((v) => v, { message: `${f.label} is required` });
            break;
          case "CHECKBOX_GROUP":
            shape[f.name] = z
              .array(z.string())
              .min(1, `${f.label} requires at least one selection`);
            break;
          case "DATE":
            shape[f.name] = z.coerce.date({
              message: `${f.label} is required`,
            });
            break;
          case "SELECT_GROUP":
            if (shouldBeRequired) {
              shape[f.name] = z.string().min(1, `${f.label} is required`);
            } else {
              shape[f.name] = z.string().optional().or(z.literal(""));
            }
            break;
          case "SELECT":
            if (shouldBeRequired) {
              shape[f.name] = z.string().min(1, `${f.label} is required`);
            } else {
              shape[f.name] = z.string().optional().or(z.literal(""));
            }
            break;
        }
      } else {
        // Field is not required or not visible - make optional
        switch (f.type) {
          case "TEXT":
          case "TEXTAREA":
            shape[f.name] = z.string().optional();
            break;
          case "RADIO":
            shape[f.name] = z
              .enum(f.options!.map((o) => o.value) as [string, ...string[]])
              .optional()
              .or(z.literal(""));
            break;
          case "CHECKBOX":
            shape[f.name] = z.boolean().optional();
            break;
          case "CHECKBOX_GROUP":
            shape[f.name] = z.array(z.string()).optional();
            break;
          case "DATE":
            shape[f.name] = z.coerce.date().optional().or(z.literal(null));
            break;
          case "SELECT_GROUP":
            shape[f.name] = "";
            break;
          case "SELECT":
            shape[f.name] = "";
            break;
        }
      }
    });

    setSchema(z.object(shape));
  }, [fields, currentValues]);

  const renderField = (field: Field, values: any) => {
    if (!isFieldVisible(field, values)) return null;

    const isRequired = isFieldRequired(field, values);
    let filteredOptions = field.options || [];
    if (
      field.type === "SELECT_GROUP" &&
      field.dependsOnQuestionId &&
      !field.dependsOnValue
    ) {
      const parentValue = values[field.dependsOnQuestionId];

      filteredOptions = field.options.filter(
        (o: any) => o.parent == parentValue
      );
    }

    return (
      <div className="space-y-1">
        <label className="block font-medium text-sm">{field.label}</label>

        {(() => {
          switch (field.type) {
            case "TEXT":
              return (
                <TextField
                  name={field.name}
                  placeholder={field.placeholder}
                  required={isRequired}
                />
              );
            case "TEXTAREA":
              return (
                <TextAreaField
                  name={field.name}
                  placeholder={field.placeholder}
                  autoResize={true}
                  resizable={true}
                  required={isRequired}
                />
              );
            case "RADIO":
              return (
                <RadioGroupField
                  name={field.name}
                  options={field.options!}
                  required={isRequired}
                />
              );

            case "SELECT":
              return (
                <SelectField
                  name={field.name}
                  options={filteredOptions}
                  required={isRequired}
                  className="w-full min-w-96"
                />
              );
            case "SELECT_GROUP":
              return (
                <SelectField
                  name={field.name}
                  options={filteredOptions}
                  required={isRequired}
                  className="w-full min-w-96"
                />
              );

            case "CHECKBOX":
              return <CheckboxField name={field.name} required={isRequired} />;
            case "CHECKBOX_GROUP":
              return (
                <CheckboxGroupField
                  name={field.name}
                  options={field.options!}
                  required={isRequired}
                />
              );
            case "DATE":
              return <DateField name={field.name} required={isRequired} />;
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    if (!formRef.current) return false;

    try {
      // Get current form values
      const values = formRef.current.form.getValues();
      console.log(values, "values");

      setCurrentValues(values);

      // Trigger validation for all required visible fields in current step
      const currentStepFields = fields.filter((f) => f.step === step);
      console.log(currentStepFields);

      const fieldNamesToValidate = currentStepFields
        .filter((f) => isFieldRequired(f, formRef.current!.form.getValues()))
        .map((f) => f.name);
      console.log(fieldNamesToValidate, "fieldNamesToValidate");

      if (fieldNamesToValidate.length === 0) return true;

      // Wait for trigger result
      const result = await formRef.current.form.trigger(fieldNamesToValidate);

      return result;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    console.log(isValid);

    if (isValid) {
      setStep(step + 1);
    } else {
      showErrorAlert("Please fill all required fields correctly");
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const submissionData: any[] = [];

      fields.forEach((field) => {
        if (isFieldVisible(field, values)) {
          submissionData.push({
            questionId: field.id, // questionId pathano lagbe
            answer: values[field.name],
          });
        }
      });

      const response = await axiosInstance.post(`/qus/answer`, submissionData);
      formRef.current.form.reset();
      setStep(1);
      showSuccessAlert("Form submitted successfully!");
    } catch (error) {
      showErrorAlert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const handleValuesChange = (values: any) => {
    setCurrentValues(values);
  };

  if (loading && fields.length === 0) return <p>Loading form...</p>;

  return (
    <Card className="bg-white shadow-sm rounded-xl p-6 my-6 max-w-2xl mx-auto border">
      {/* Step indicators */}
      <div className="flex justify-between mb-6 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
        {stepsConfig.map((s, index) => (
          <div key={s.step} className="flex flex-col items-center relative">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                s.step === step
                  ? "bg-blue-600 border-blue-600 text-white"
                  : s.step < step
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {s.step}
            </div>
            <div
              className={`text-xs mt-1 ${
                s.step === step ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              {s.title}
            </div>
          </div>
        ))}
      </div>

      <GenericForm
        schema={schema}
        initialValues={initialValues}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <FormWatcher
          renderField={renderField}
          fields={fields}
          step={step}
          onValuesChange={handleValuesChange}
        />

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
