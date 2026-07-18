import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

type Props = {
  protein: number;
  carbs: number;
  fat: number;
};

export default function MacroChart({
  protein,
  carbs,
  fat,
}: Props) {

  const data = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [protein, carbs, fat],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom" as const,

        labels: {
          color: "#fff",
          
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
    },
  };

  return (
    <div className="h-64 w-64">
      <Pie
        data={data}
        options={options}
      />
    </div>
  );
}