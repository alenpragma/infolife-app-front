import { AxiosError } from "axios";

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface ApiErrorResponse {
  statusCode?: number;
  message?: string;
  success?: boolean;
  errors?: Record<string, string[]>;
}

export const handleErrorResponse = (
  error: AxiosError
): IGenericErrorResponse => {
  const errorData = error.response?.data as ApiErrorResponse | undefined;
  let dynamicMessage: string | undefined;

  if (errorData?.errors && typeof errorData.errors === "object") {
    const firstKey = Object.keys(errorData.errors)[0];
    const firstMessage = errorData.errors[firstKey]?.[0];
    dynamicMessage = firstMessage;
  }

  return {
    statusCode: error.response?.status || 500,
    message: errorData?.message || dynamicMessage || "Something went wrong",
    success: errorData?.success?.toString(),
  };
};
