"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// Données simulées pour les 6 derniers mois
const data = [
  {
    month: "Jan",
    principale: 40000,
    penalites: 60000,
    amendes: 7000,
  },
  {
    month: "Fév",
    principale: 20000,
    penalites: 30000,
    amendes: 5000,
  },
  {
    month: "Mar",
    principale: 10000,
    penalites: 28000,
    amendes: 50000,
  },
  {
    month: "Avr",
    principale: 70000,
    penalites: 10000,
    amendes: 80000,
  },
  {
    month: "Mai",
    principale: 80000,
    penalites: 120000,
    amendes: 125000,
  },
  {
    month: "Juin",
    principale: 105000,
    penalites: 60000,
    amendes: 130000,
  },
];

const chartConfig = {
  principale: {
    label: "Principale",
    color: "#383ac4", // Bleu vif
  },
  penalites: {
    label: "Pénalités",
    color: "#ef4444", // Rouge vif
  },
  amendes: {
    label: "Amendes",
    color: "#31ce9b", // Vert vif
  },
};

export function StatisticsChart() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Statistiques des montants
        </h3>
        <p className="text-sm text-colorMuted">Janvier - Juin 2024</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="var(--borderTr)"
          />
          <XAxis
            dataKey="month"
            className="text-xs fill-colorMuted"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            className="text-xs fill-colorMuted"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                cursor={false}
                labelFormatter={(value) => `Mois: ${value}`}
                formatter={(value, name) => [
                  `${value.toLocaleString()} CDF`,
                  chartConfig[name as keyof typeof chartConfig]?.label || name,
                ]}
                className="bg-white border border-gray-200 shadow-lg rounded-lg"
              />
            }
          />
          <Line
            type="monotone"
            dataKey="principale"
            stroke="#494be3"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 3,
              strokeWidth: 2,
              stroke: "#494be3",
              fill: "#494be3",
            }}
          />
          <Line
            type="monotone"
            dataKey="penalites"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 3,
              strokeWidth: 2,
              stroke: "#ef4444",
              fill: "#ef4444",
            }}
          />
          <Line
            type="monotone"
            dataKey="amendes"
            stroke="#31ce9b"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 3,
              strokeWidth: 2,
              stroke: "#31ce9b",
              fill: "#31ce9b",
            }}
          />
        </LineChart>
      </ChartContainer>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#494be3]"></div>
            <span className="text-sm text-colorMuted">Principale</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <span className="text-sm text-colorMuted">Pénalités</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#31ce9b]"></div>
            <span className="text-sm text-colorMuted">Amendes</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Tendance positive</p>
          <p className="text-xs text-colorMuted">Évolution sur 6 mois</p>
        </div>
      </div>
    </div>
  );
}
