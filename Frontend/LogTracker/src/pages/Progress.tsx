import { useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Progress() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await api.get(`/progress?weekOffset=${weekOffset}`);
      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [weekOffset]);

  return (
    <div className="min-h-screen bg-[#0B0707] text-white px-4 pb-28">

      <h1 className="text-3xl font-bold text-center pt-8">
        Progress
      </h1>

      <div className="mt-8 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur">
        <button
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="rounded-full bg-zinc-800 p-2 text-zinc-100 transition hover:bg-orange-500/80"
        >
          <ChevronLeft size={18} />
        </button>

        <h2 className="min-w-[180px] text-center text-base font-semibold text-zinc-100">
          {weekOffset === 0
            ? "Current Week"
            : `${weekOffset} Week${weekOffset > 1 ? "s" : ""} Ago`}
        </h2>

        <button
          disabled={weekOffset === 0}
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="rounded-full bg-zinc-800 p-2 text-zinc-100 transition hover:bg-orange-500/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-6 h-[430px] rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Nutrition trend</p>
            <h3 className="text-lg font-semibold text-white">Last 7 days</h3>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={reports} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#374151" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="macro"
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={52}
              tickFormatter={(value) => `${value}g`}
            />
            <YAxis
              yAxisId="calorie"
              orientation="right"
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={56}
              tickFormatter={(value) => `${value}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid rgba(249,115,22,0.35)",
                borderRadius: "14px",
                color: "white",
              }}
              labelStyle={{ color: "#fff", fontWeight: 600 }}
              cursor={{ stroke: "#f97316", strokeWidth: 1 }}
              formatter={(value, name) => {
                const numericValue = Number(value ?? 0);
                const key = String(name ?? "").toLowerCase();
                return [
                  `${numericValue}${key === "calories" ? " kcal" : " g"}`,
                  String(name ?? "").charAt(0).toUpperCase() + String(name ?? "").slice(1),
                ];
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 10 }}
              iconType="circle"
              iconSize={10}
            />

            <Line
              yAxisId="calorie"
              type="monotone"
              dataKey="calories"
              name="Calories"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: "#0B0707" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />

            <Line
              yAxisId="macro"
              type="monotone"
              dataKey="protein"
              name="Protein"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 3, strokeWidth: 2, fill: "#0B0707" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />


          </LineChart>
        </ResponsiveContainer>
      </div>

      <BottomNavbar />

    </div>
  );
}