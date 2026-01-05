"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useConfig } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Gift } from "lucide-react";
import { TRY_TO_LUCK_ABI } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useClaimLimit } from "@/hooks/use-claim-limit";

export function DailyRewardButton() {
    const { isConnected } = useAccount();
    const { writeContractAsync, isPending, error: writeError } = useWriteContract();
    const config = useConfig();
    const { incrementClaims, canClaim } = useClaimLimit();

    const [pendingClaims, setPendingClaims] = useState(0);
    const [lastClaimed, setLastClaimed] = useState(false);

    const contractAddress = process.env.NEXT_PUBLIC_TRY_TO_LUCK_TOKEN_ADDRESS as `0x${string}`;

    const handleClaim = async () => {
        if (!contractAddress) {
            console.error("Contract address not set");
            return;
        }

        try {
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: TRY_TO_LUCK_ABI,
                functionName: 'tryClaimDailyReward',
            });

            setPendingClaims(prev => prev + 1);
            setLastClaimed(false);

            // Fire and forget waiting process
            processTransaction(hash);

        } catch (error) {
            console.error("Failed to submit transaction", error);
        }
    };

    const processTransaction = async (hash: `0x${string}`) => {
        try {
            await waitForTransactionReceipt(config, { hash });
            incrementClaims();
            if (pendingClaims <= 1) { // If this was the last one
                setLastClaimed(true);
                setTimeout(() => setLastClaimed(false), 3000);
            }
        } catch (error) {
            console.error("Transaction failed", error);
        } finally {
            setPendingClaims(prev => Math.max(0, prev - 1));
        }
    };

    // Render only if connected.
    if (!isConnected) return null;

    return (
        <div className="flex flex-col items-center gap-2 mb-4 w-full max-w-xs animate-in fade-in zoom-in duration-500">
            <Button
                onClick={handleClaim}
                disabled={isPending || !contractAddress || !canClaim}
                className={cn(
                    "w-full relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 group",
                    "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700",
                    "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600",
                    "text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-orange-500/25 border-0",
                    !canClaim && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />

                <div className="relative flex items-center justify-center gap-2 text-lg">
                    {isPending ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Confirming...
                        </>
                    ) : lastClaimed && pendingClaims === 0 ? (
                        <>
                            <Sparkles className="h-5 w-5 animate-bounce" />
                            Claimed!
                        </>
                    ) : !canClaim ? (
                        <>
                            Daily Limit Reached
                        </>
                    ) : (
                        <>
                            {pendingClaims > 0 ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Gift className="h-5 w-5 animate-pulse" />
                            )}
                            {pendingClaims > 0 ? `Claiming (${pendingClaims})...` : "Claim Daily Reward"}
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
