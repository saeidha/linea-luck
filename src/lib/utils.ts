import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, chars = 4) {
  if (!address) return ""
  if (address.length <= chars * 2 + 3) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
}
