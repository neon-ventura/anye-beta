
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { formatPrice, formatNumber } from "@/lib/format";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  isStock?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  isStock = false,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden rounded-xl border transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && (
          <div className={cn("rounded-full p-2", 
            trend?.isPositive ? "bg-green-100 text-green-600" : 
            trend?.isPositive === false ? "bg-red-100 text-red-600" : 
            "bg-blue-100 text-blue-600"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {isStock ? (
            <div className="flex items-end">
              <span>{value}</span>
              <span className="text-xs text-gray-500 ml-1 mb-1">SKUs</span>
            </div>
          ) : (
            typeof value === "number" ? formatNumber(value) : value
          )}
        </div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend && (
              <span
                className={cn(
                  "mr-1 font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && <span className="text-gray-500">{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
