"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function PerformanceChart({
  data,
}: {
  data: { date: string; pct: number; answered: number }[];
}) {
  const showData = data.length > 0
    ? data
    : Array.from({ length: 7 }).map((_, i) => ({
        date: `D${i + 1}`,
        pct: 0,
        answered: 0,
      }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={showData} margin={{ top: 12, left: 0, right: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="perf-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B9DFF" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#5B9DFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              background: "rgba(20,20,30,0.92)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              color: "#F4F4F5",
              fontSize: 12,
            }}
            formatter={(value: number, name) => {
              if (name === "pct") return [`${value}%`, "Aproveitamento"];
              return [value, name];
            }}
          />
          <Area
            type="monotone"
            dataKey="pct"
            stroke="#5B9DFF"
            strokeWidth={2}
            fill="url(#perf-grad)"
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
