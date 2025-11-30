"use client";

import { useState, useEffect, useCallback } from 'react';
import { DAILY_CLAIM_LIMIT } from '@/lib/constants';

const STORAGE_KEY = 'linea-luck-claims';

interface ClaimData {
  count: number;
  date: string; // YYYY-MM-DD
}

export function useClaimLimit() {
  const [claimData, setClaimData] = useState<ClaimData>({ count: 0, date: '' });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const today = new Date().toISOString().split('T')[0];

      if (storedData) {
        const parsedData: ClaimData = JSON.parse(storedData);
        if (parsedData.date === today) {
          setClaimData(parsedData);
        } else {
          const newDayData = { count: 0, date: today };
          setClaimData(newDayData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newDayData));
        }
      } else {
        const initialData = { count: 0, date: today };
        setClaimData(initialData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch (error) {
        console.error("Failed to access local storage", error);
        const today = new Date().toISOString().split('T')[0];
        setClaimData({ count: 0, date: today });
    } finally {
        setIsInitialized(true);
    }
  }, []);

  const incrementClaims = useCallback(() => {
    setClaimData(prevData => {
      const newData = { ...prevData, count: prevData.count + 1 };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error("Failed to write to local storage", error);
      }
      return newData;
    });
  }, []);
  
  const claimsLeft = DAILY_CLAIM_LIMIT - claimData.count;
  const canClaim = isInitialized && claimsLeft > 0;

  return { claimsLeft: Math.max(0, claimsLeft), incrementClaims, canClaim, isInitialized };
}
