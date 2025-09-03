import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";

const RepeatableDynamicSection = ({ fieldsConfig }: { fieldsConfig }) => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups", // সব repeated form এই array তে যাবে
  });

  return (
    <div className="space-y-6">
      {fields.map((item, groupIndex) => (
        <div key={item.id} className="border rounded-xl p-4 space-y-4">
          <h4 className="font-semibold">Set {groupIndex + 1}</h4>

          {fieldsConfig.map((f) => (
            <div key={f.id} className="space-y-1">
              <label className="block text-sm font-medium">{f.label}</label>

              {f.type === "TEXT" && (
                <input
                  type="text"
                  {...register(`groups.${groupIndex}.${f.name}`)}
                  placeholder={f.placeholder}
                  className="border p-2 rounded w-full"
                />
              )}

              {f.type === "TEXTAREA" && (
                <textarea
                  {...register(`groups.${groupIndex}.${f.name}`)}
                  placeholder={f.placeholder}
                  className="border p-2 rounded w-full"
                />
              )}

              {f.type === "RADIO" && (
                <div className="space-y-2">
                  {f.options?.map((o) => (
                    <label key={o.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={o.value}
                        {...register(`groups.${groupIndex}.${f.name}`)}
                      />
                      {o.text}
                    </label>
                  ))}
                </div>
              )}

              {f.type === "CHECKBOX_GROUP" && (
                <div className="space-y-2">
                  {f.options?.map((o) => (
                    <label key={o.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={o.value}
                        {...register(`groups.${groupIndex}.${f.name}`)}
                      />
                      {o.text}
                    </label>
                  ))}
                </div>
              )}

              {f.type === "DATE" && (
                <input
                  type="date"
                  {...register(`groups.${groupIndex}.${f.name}`)}
                  className="border p-2 rounded w-full"
                />
              )}

              {f.type === "SELECT" && (
                <select
                  {...register(`groups.${groupIndex}.${f.name}`)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select...</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.text}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(groupIndex)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          // প্রতিবার পুরো fieldsConfig default value নিয়ে add হবে
          const initValues: Record<string, any> = {};
          fieldsConfig.forEach((f) => {
            initValues[f.name] =
              f.type === "CHECKBOX_GROUP"
                ? []
                : f.type === "CHECKBOX"
                ? false
                : f.type === "DATE"
                ? null
                : "";
          });
          append(initValues);
        }}
      >
        + Add Another
      </Button>
    </div>
  );
};

export default RepeatableDynamicSection;
