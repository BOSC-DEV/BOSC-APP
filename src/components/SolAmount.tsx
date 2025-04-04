
import React, { useState } from "react";
import { useSolanaPrice } from "@/utils/priceUtils";

interface SolAmountProps {
  amount: number;
  className?: string;
  showIcon?: boolean;
  decimals?: number;
}

export function SolAmount({ amount, className, showIcon = false, decimals = 2 }: SolAmountProps) {
  const [showUsd, setShowUsd] = useState(false);
  const { data: solPrice, isLoading, isError } = useSolanaPrice();
  
  // Format with configurable decimal places
  const formattedSol = `${amount.toFixed(decimals)} SOL`;
  
  let usdValue = "Loading...";
  
  if (!isLoading && !isError && solPrice) {
    const usdAmount = amount * solPrice;
    usdValue = `$${usdAmount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} USD`;
  } else if (isError) {
    usdValue = "Price unavailable";
  }

  return (
    <span 
      className={className}
      onMouseEnter={() => setShowUsd(true)}
      onMouseLeave={() => setShowUsd(false)}
    >
      {showIcon && (
        <img 
          src="/lovable-uploads/b56ce7fa-4bb2-4920-b10e-4b0c6907f0ec.png" 
          alt="SOL"
          className="h-5 w-5 mr-1 inline-block align-text-bottom" 
          style={{ objectFit: "contain" }}
        />
      )}
      <span className="inline-block">
        {showUsd ? usdValue : formattedSol}
      </span>
    </span>
  );
}
