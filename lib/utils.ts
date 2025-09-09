import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const url = 'https://infolifeapi.edulife.agency/api/v1';
export const url = 'http://localhost:5000/api/v1';
