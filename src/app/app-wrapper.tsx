"use client";

import { Web3Provider } from "@/components/providers/web3-provider";
import type { ReactNode } from "react";

export default function AppWrapper({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
