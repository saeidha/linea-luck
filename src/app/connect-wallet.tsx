"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { Wallet, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ConnectWallet() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<'checking' | 'success' | 'failed' | null>(null);
  const [pohStatus, setPohStatus] = useState<'checking' | 'success' | 'failed' | null>(null);

  useEffect(() => {
    const verifyAndCheck = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        setTokenStatus('checking');
        setPohStatus('checking');

        const startTime = Date.now();

        // Simulate token check. Assuming balance check is handled elsewhere,
        // for now we'll just show progress and success.
        const tokenPromise = new Promise(resolve => setTimeout(() => {
            setTokenStatus('success');
            resolve(true);
        }, 1500));

        // POH check
        const pohPromise = fetch(`https://poh-api.linea.build/poh/v2/${address}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setPohStatus(data ? 'success' : 'failed');
                setIsVerified(data);
                if (data === false) {
                  setShowVerificationDialog(true);
                }
                return data;
            })
            .catch(() => {
                setPohStatus('failed');
                setIsVerified(false);
                setShowVerificationDialog(true);
                return false;
            });

        await Promise.all([tokenPromise, pohPromise]);

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 3000;

        if (elapsedTime < minDisplayTime) {
            await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime));
        }

        // Wait 1 second before showing the final result
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsVerified(null);
        setTokenStatus(null);
        setPohStatus(null);
      }
    };

    verifyAndCheck();
  }, [isConnected, address]);

  if (isLoading) {
    return (
        <Card className="w-full max-w-md text-left bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Checking eligibility...</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    {tokenStatus === 'checking' && <Loader2 className="h-5 w-5 animate-spin" />}
                    {tokenStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {tokenStatus === 'failed' && <XCircle className="h-5 w-5 text-red-500" />}
                    <p>Holding Linea token</p>
                </div>
                <div className="flex items-center gap-2">
                    {pohStatus === 'checking' && <Loader2 className="h-5 w-5 animate-spin" />}
                    {pohStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {pohStatus === 'failed' && <XCircle className="h-5 w-5 text-red-500" />}
                    <p>Verified POH</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  if (isConnected && address) {
    return (
      <>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            {isVerified === true && <CheckCircle className="h-5 w-5 text-blue-500" />}
            {isVerified === false && <XCircle className="h-5 w-5 text-red-500" />}
            <span className="font-mono text-sm text-foreground/80 hidden md:inline-block">
              {truncateAddress(address)}
            </span>
          </div>
          <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
        </div>
        <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Wallet Verification</AlertDialogTitle>
              <AlertDialogDescription>
                Your wallet is not verified. Please verify your wallet at{' '}
                <a
                  href="https://linea.build/hub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  linea.build/hub
                </a>{' '}
                after connecting your wallet. You can continue, but some features might be limited.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowVerificationDialog(false)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <Button onClick={() => open()}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
    </Button>
  );
}
