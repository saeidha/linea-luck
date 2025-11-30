"use client"

import { useAccount, useReadContract } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChanceWheel } from "@/components/chance-wheel";
import { LINEA_TOKEN_ADDRESS, LINEA_TOKEN_ABI, DAILY_CLAIM_LIMIT } from "@/lib/constants";
import { useClaimLimit } from "@/hooks/use-claim-limit";
import { LineaIcon } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2, Frown } from "lucide-react";

export function ClaimSection() {
    const { isConnected, address } = useAccount();
    const { claimsLeft, incrementClaims, canClaim, isInitialized } = useClaimLimit();

    const { data: balance, isLoading: isBalanceLoading } = useReadContract({
        address: LINEA_TOKEN_ADDRESS,
        abi: LINEA_TOKEN_ABI,
        functionName: 'balanceOf',
        args: [address!],
        query: {
            enabled: isConnected,
        },
    });

    const isEligible = balance ? balance > 0n : false;

    if (!isConnected) {
        return (
            <Card className="w-full max-w-md text-center bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Welcome to Linea Luck</CardTitle>
                    <CardDescription>Connect your wallet to see if you're eligible to claim ATB tokens.</CardDescription>
                </CardHeader>
            </Card>
        );
    }
    
    if (isBalanceLoading || !isInitialized) {
        return (
            <Card className="w-full max-w-md text-center bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p>Checking eligibility...</p>
                </CardContent>
            </Card>
        );
    }

    if (!isEligible) {
        return (
            <Alert variant="destructive" className="max-w-md">
                <Frown className="h-4 w-4" />
                <AlertTitle>Not Eligible to Claim</AlertTitle>
                <AlertDescription>
                    You need to hold Linea tokens (on the Linea network) to be eligible to claim ATB tokens.
                </AlertDescription>
            </Alert>
        );
    }

    if (!canClaim) {
        return (
            <Alert className="max-w-md">
                <Info className="h-4 w-4" />
                <AlertTitle>Daily Limit Reached</AlertTitle>
                <AlertDescription>
                    You have reached your daily limit of {DAILY_CLAIM_LIMIT} claims. Please come back tomorrow.
                </AlertDescription>
            </Alert>
        );
    }

    return <ChanceWheel claimsLeft={claimsLeft} onClaimSuccess={incrementClaims} />;
}
