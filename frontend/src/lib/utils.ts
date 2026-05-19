import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(phone: string, message?: string): string {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hi Visualise.Co! I'd like to discuss a project.");
  return `https://wa.me/${phone}?text=${text}`;
}
