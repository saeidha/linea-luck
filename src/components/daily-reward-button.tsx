"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Gift } from "lucide-react";
import { TRY_TO_LUCK_ABI } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DailyRewardButton() {
    const { isConnected } = useAccount();
    const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const contractAddress = process.env.NEXT_PUBLIC_TRY_TO_LUCK_TOKEN_ADDRESS as `0x${string}`;

    const handleClaim = () => {
        if (!contractAddress) {
            console.error("Contract address not set");
            return;
        }
        writeContract({
            address: contractAddress,
            abi: TRY_TO_LUCK_ABI,
            functionName: 'tryClaimDailyReward',
        });
    };

    // Render only if connected.
    if (!isConnected) return null;

    return (
        <div className="flex flex-col items-center gap-2 mb-4 w-full max-w-xs animate-in fade-in zoom-in duration-500">
            <Button
                onClick={handleClaim}
                disabled={isPending || isConfirming || !contractAddress}
                className={cn(
                    "w-full relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 group",
                    "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700", // Changed colors to match "Linea" purple/dark theme maybe? Or stick to Gold/Reward theme?
                    // Let's go with Gold/Amber for "Reward" as before, it looked premium.
                    "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600",
                    "text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-orange-500/25 border-0"
                )}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />

                <div className="relative flex items-center justify-center gap-2 text-lg">
                    {isPending || isConfirming ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            {isPending ? "Confirming..." : "Claiming..."}
                        </>
                    ) : isConfirmed ? (
                        <>
                            <Sparkles className="h-5 w-5 animate-bounce" />
                            Claimed!
                        </>
                    ) : (
                        <>
                            <Gift className="h-5 w-5 animate-pulse" />
                            Claim Daily Reward
                        </>
                    )}
                </div>
            </Button>

            {writeError && (
                <p className="text-xs text-red-500 font-medium text-center animate-in fade-in slide-in-from-top-1 bg-red-100/10 p-1 rounded">
                    {writeError.message.includes("User rejected") ? "Transaction rejected" : "Failed to claim reward"}
                </p>
            )}

            {!contractAddress && (
                <p className="text-xs text-yellow-500 font-medium text-center">
                    Contract address not configured
                </p>
            )}
        </div>
    );
}
