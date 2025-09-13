import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefreshButtonProps {
  onRefresh: () => Promise<void> | void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  className,
  size = "sm",
  variant = "outline",
  disabled = false,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (isRefreshing || disabled || !onRefresh || typeof onRefresh !== 'function') return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
    } finally {
      // Délai minimum pour l'animation
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8 p-0",
    md: "h-9 w-9 p-0",
    lg: "h-10 w-10 p-0",
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={disabled || isRefreshing}
      variant={variant}
      size="sm"
      className={cn(
        "rounded-full transition-all duration-200 hover:scale-105 active:scale-95",
        sizeClasses[size],
        className
      )}
      title={isRefreshing ? "Actualisation en cours..." : "Actualiser les données"}
    >
      <RefreshCw 
        size={size === "sm" ? 14 : size === "lg" ? 18 : 16} 
        className={cn(
          "transition-transform duration-200",
          isRefreshing && "animate-spin"
        )}
      />
    </Button>
  );
};
