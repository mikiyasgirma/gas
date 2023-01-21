import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useGasStationsStore from "../store/gasStationsStore";
import useAgentsStore from "../store/agentsStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);
  const syncUsers = useAgentsStore((state) => state.syncUsers);
  const users = useAgentsStore((state) => state.agents);

  useEffect(() => {
    syncGasStations();
    syncUsers();
  }, []);

  const averageCounter = [
    {
      value: "high",
      count: 0,
    },
    {
      value: "low",
      count: 0,
    },
    {
      value: "medium",
      count: 0,
    },
  ];

  for (const obj of gasStations) {
    if (obj.queue === "high") averageCounter[0].count++;
    else if (obj.queue === "medium") averageCounter[2].count++;
    else if (obj.queue === "low") averageCounter[1].count++;
  }

  const data = {
    labels: ["High", "Low", "Medium"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          averageCounter[0].count,
          averageCounter[1].count,
          averageCounter[2].count,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={{ maintainAspectRatio: false }} />;
}
