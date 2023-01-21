import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import useGasStationsStore from "../store/gasStationsStore";
import useAgentsStore from "../store/agentsStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const gasStations = useGasStationsStore((state) => state.gasStations);
  const syncGasStations = useGasStationsStore((state) => state.syncGasStations);
  const syncUsers = useAgentsStore((state) => state.syncUsers);
  const users = useAgentsStore((state) => state.agents);

  useEffect(() => {
    syncGasStations();
    syncUsers();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = gasStations.slice(0, 5);

  const data = {
    labels,
    datasets: [
      {
        label: "Nafta",
        data: labels.map((gasStation) => gasStation.naftaAvailable),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Benzil",
        data: labels.map((gasStation) => gasStation.benzilAvailable),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={{ maintainAspectRatio: false }} data={data} />;
}
