"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ATB_TOKEN_ADDRESS, ATB_TOKEN_ABI } from '@/lib/constants';

const segments = [10, 1, 8, 3, 6, 5, 4, 7, 2, 9];
const totalSegments = segments.length;
const segmentAngle = 360 / totalSegments;

interface ChanceWheelProps {
  claimsLeft: number;
  onClaimSuccess: () => void;
}

const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

const Segment = ({ index, value }: { index: number; value: number }) => {
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;

    const [startX, startY] = getCoordinatesForPercent(startAngle / 360);
    const [endX, endY] = getCoordinatesForPercent(endAngle / 360);
    
    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

    const textAngle = startAngle + segmentAngle / 2;
    const textRadius = 0.65;
    const textX = Math.cos(textAngle * Math.PI / 180) * textRadius;
    const textY = Math.sin(textAngle * Math.PI / 180) * textRadius;

    return (
        <g>
            <path d={pathData} fill={index % 2 === 0 ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--primary) / 0.5)'} stroke="hsl(var(--border))" strokeWidth="0.01" />
            <text 
                x={textX} 
                y={textY}
                fill="hsl(var(--foreground))"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="0.15"
                fontWeight="bold"
                transform={`rotate(${textAngle + 90} ${textX} ${textY})`}
            >
                {value}
            </text>
        </g>
    );
}

export function ChanceWheel({ claimsLeft, onClaimSuccess }: ChanceWheelProps) {
    const [isClient, setIsClient] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winningAmount, setWinningAmount] = useState<number | null>(null);
    const { toast } = useToast();
    const [spinTimeout, setSpinTimeout] = useState<NodeJS.Timeout | null>(null);
    const [showSkip, setShowSkip] = useState(false);

    const { data: hash, error, isPending, writeContract, reset } = useWriteContract();
    const { isLoading: isConfirming, isSuccess, status } = useWaitForTransactionReceipt({ hash });

    useEffect(() => { setIsClient(true) }, []);

    const finishSpin = (winningNumber: number) => {
        setWinningAmount(winningNumber);
        setSpinning(false);
        setShowSkip(false);
        if (spinTimeout) {
            clearTimeout(spinTimeout);
            setSpinTimeout(null);
        }
    };
    
    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        setWinningAmount(null);
        reset();

        const winningSegmentIndex = Math.floor(Math.random() * totalSegments);
        const winningNumber = segments[winningSegmentIndex];
        
        const randomRotations = Math.floor(Math.random() * 3) + 10; // 10 to 12 rotations
        const targetAngle = 360 - (winningSegmentIndex * segmentAngle) - (segmentAngle / 2);
        const newRotation = rotation + (randomRotations * 360) + targetAngle;
        
        setRotation(newRotation);

        setShowSkip(true);
        const timeout = setTimeout(() => {
          finishSpin(winningNumber);
        }, 30000); 
        setSpinTimeout(timeout);
    };

    const handleSkip = () => {
        if (!spinning || !spinTimeout) return;
        
        const currentTargetRotation = rotation;
        const fullRotations = Math.floor(currentTargetRotation / 360);
        const baseRotation = currentTargetRotation - (fullRotations * 360);

        const segmentThatWouldWin = Math.round((360 - baseRotation - (segmentAngle/2)) / segmentAngle) % totalSegments;
        const winningNumber = segments[segmentThatWouldWin];

        setRotation(currentTargetRotation);
        
        finishSpin(winningNumber);
    };

    const handleClaim = () => {
        if (!winningAmount) return;
        writeContract({
            address: ATB_TOKEN_ADDRESS,
            abi: ATB_TOKEN_ABI,
            functionName: 'claim',
            args: [BigInt(winningAmount)],
        });
    };

    useEffect(() => {
        if (status === 'success') {
            toast({
                title: "Claim Successful!",
                description: `You've successfully claimed ${winningAmount} ATB tokens.`,
            });
            onClaimSuccess();
            setWinningAmount(null);
        } else if (status === 'reverted') {
            toast({
                title: "Claim Failed",
                description: "The transaction was reverted. Please try again.",
                variant: 'destructive'
            });
        }
    }, [status, onClaimSuccess, toast, winningAmount]);
    
    useEffect(() => {
        if (error) {
            toast({
                title: "Claim Error",
                description: error.shortMessage || "An unknown error occurred.",
                variant: 'destructive'
            });
        }
    }, [error, toast]);

    useEffect(() => {
        return () => {
            if (spinTimeout) {
                clearTimeout(spinTimeout);
            }
        };
    }, [spinTimeout]);

    if (!isClient) {
        return <div className="w-80 h-80 md:w-96 md:h-96 bg-card/20 animate-pulse rounded-full" />;
    }
    
    const isProcessing = spinning || isPending || isConfirming;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-accent" />
                </div>
                
                <div 
                    className="w-full h-full transition-transform duration-[30000ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)]"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onTransitionEnd={() => {
                        if (!spinning) return;
                        const currentTargetRotation = rotation;
                        const fullRotations = Math.floor(currentTargetRotation / 360);
                        const baseRotation = currentTargetRotation - (fullRotations * 360);

                        const segmentThatWouldWin = Math.round((360 - baseRotation - (segmentAngle/2)) / segmentAngle) % totalSegments;
                        const winningNumber = segments[segmentThatWouldWin];
                        finishSpin(winningNumber);
                    }}
                >
                    <svg viewBox="-1.05 -1.05 2.1 2.1" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                        {segments.map((segment, index) => (
                            <Segment key={index} index={index} value={segment} />
                        ))}
                    </svg>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full bg-background flex items-center justify-center shadow-inner-lg flex-col p-2 text-center">
                    {winningAmount && !isPending && !isConfirming && !isSuccess ? (
                        <Button size="lg" className="h-28 w-28 rounded-full flex-col leading-tight" onClick={handleClaim}>
                            Claim
                            <span className="text-3xl font-bold">{winningAmount}</span>
                            ATB
                        </Button>
                    ) : (
                        <Button size="lg" className="h-28 w-28 rounded-full" onClick={handleSpin} disabled={isProcessing}>
                            {spinning ? 'Spinning' : isPending ? 'Sending' : isConfirming ? 'Waiting' : 'Spin'}
                        </Button>
                    )}
                    </div>
                </div>
            </div>

            {showSkip && (
                <Button variant="link" onClick={handleSkip} disabled={!spinning}>
                    Skip animation
                </Button>
            )}

            <div className="text-center">
                <p className="text-foreground/80">You have</p>
                <p className="text-4xl font-bold text-accent">{claimsLeft}</p>
                <p className="text-foreground/80">claims left today</p>
            </div>
        </div>
    );
}
