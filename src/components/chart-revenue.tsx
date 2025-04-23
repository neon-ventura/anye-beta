
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Legend,
  Line,
  ComposedChart
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { RevenueData } from "@/types";
import { ArrowUpRight, TrendingUp } from "lucide-react";

interface ChartRevenueProps {
  data: RevenueData[];
  title?: string;
  description?: string;
}

export function ChartRevenue({
  data,
  title = "Receita",
  description = "Visão geral da receita mensal",
}: ChartRevenueProps) {
  // Ensure we return a string from the formatter function
  const formatter = (value: number): string => {
    return formatPrice(value);
  };
  
  // Calculate growth percentage compared to the first month
  const calculateGrowth = () => {
    if (data.length < 2) return 0;
    const firstMonth = data[0].amount;
    const lastMonth = data[data.length - 1].amount;
    return Math.round(((lastMonth - firstMonth) / firstMonth) * 100);
  };
  
  const growthPercentage = calculateGrowth();
  const isPositive = growthPercentage >= 0;

  const totalRevenue = data.reduce((total, item) => total + item.amount, 0);

  return (
    <Card className="chart-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(totalRevenue)}
            </div>
            <div className={cn("flex items-center text-sm", isPositive ? "text-emerald-600" : "text-red-600")}>
              <span className="mr-1">{isPositive ? "+" : ""}{growthPercentage}%</span>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4 rotate-90" />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[320px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4361ee" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                stroke="#888888" 
                fontSize={12}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                stroke="#888888" 
                fontSize={12}
                tickFormatter={(value) => formatter(value)}
              />
              <Tooltip 
                formatter={(value) => [formatter(Number(value)), "Receita"]}
                labelFormatter={(label) => `Data: ${label}`}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  padding: "8px 12px",
                  fontSize: "12px",
                }}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <Legend />
              <Bar
                dataKey="amount"
                fill="url(#colorRevenue)"
                radius={[4, 4, 0, 0]}
                name="Receita"
                barSize={40}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#4361ee" 
                strokeWidth={2} 
                dot={{ fill: "#4361ee", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#4361ee", stroke: "white", strokeWidth: 2 }}
                name="Tendência"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
