import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {Doughnut} from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

  type Props = {
  consumed: number;
  goal: number;
};


export default function ProtienChart({consumed,goal}:Props){


  
     
    const remaining= Math.max(goal-consumed,2)



    const data = {
  labels: ["Consumed", "Remaining"],
  datasets: [
    {
      data: [consumed, remaining],
      backgroundColor: [
        "#22c55e",
        "#2b2b2b",
      ],
      borderWidth: 0,
      cutout: "50%",
    },
  ],
};

const options = {
  cutout: "75%",
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,

      labels: {
        color: "#fff",
        font: {
          size: 14,
        },
      },
    },
  },
  maintainAspectRatio: false,
};

    return(

         <>
            <Doughnut data={data} options={options} ></Doughnut>

         </>

    )
}