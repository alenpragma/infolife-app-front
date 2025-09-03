import { CheckboxField } from "./form/fields/CheckboxField";
import { CheckboxGroupField } from "./form/fields/CheckboxGroupField";
import { DateField } from "./form/fields/DateField";
import { RadioGroupField } from "./form/fields/RadioGroupField";
import { SelectField } from "./form/fields/SelectField";
import { TextAreaField } from "./form/fields/TextAreaField";
import { TextField } from "./form/fields/TextField";

type FieldOption = { value: string; text: string };
type Field = {
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
    | "SELECT";
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  step: number;
  dependsOnQuestionId?: string | null;
  dependsOnValue?: string | null;
};

const RanderField = (field: Field, values: any) => {
  // Check if a field should be required based on visibility and required flag
  const isFieldRequired = (field: Field, values: any): boolean => {
    if (!isFieldVisible(field, values)) return false;
    return !!field.required;
  };

  // Check if a field should be visible based on dependencies
  const isFieldVisible = (field: Field, values: any): boolean => {
    if (!field.dependsOnQuestionId || !field.dependsOnValue) {
      return true;
    }

    const parentValue = values[field.dependsOnQuestionId];
    return parentValue === field.dependsOnValue;
  };

  if (!isFieldVisible(field, values)) return null;

  const isRequired = isFieldRequired(field, values);

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
                autoResize
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
                options={field.options!}
                required={isRequired}
              />
            );
          case "CHECKBOX":
            return (
              <CheckboxField name={field.name} label="" required={isRequired} />
            );
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

export default RanderField;
