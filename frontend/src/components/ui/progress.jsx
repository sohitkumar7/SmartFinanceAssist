import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  indicatorClassName,
  ...props
}) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full transition-all duration-300 ease-in-out", indicatorClassName || "bg-primary")}
        style={{ 
          width: `${normalizedValue}%`,
          minWidth: normalizedValue > 0 ? undefined : '2px'
        }} />
    </ProgressPrimitive.Root>
  );
}

export { Progress }
