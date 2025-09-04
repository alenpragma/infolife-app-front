import { z, ZodType } from "zod";
import { Field } from "./StepperForm";

export const createInitialSchema = (fields: Field[]): ZodType<any> => {
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
            }
        }
    });

    return z.object(shape);
};
