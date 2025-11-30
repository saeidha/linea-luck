"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { Wallet } from "lucide-react";

export function ConnectWallet() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 md:gap-4">
        <span className="font-mono text-sm text-foreground/80 hidden md:inline-block">{truncateAddress(address)}</span>
        <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    );
  }

  return (
    <Button onClick={() => open()}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
    </Button>
  );
}
