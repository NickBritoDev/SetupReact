import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import crmData from "../../../../json/crm/data.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartComponent() {
  const crm = crmData[0];

  const labels = crm.leads.map((lead) => lead.status);
  const totalData = crm.leads.map((lead) => lead.quantidade);

  const backgroundColors = crm.leads.map((lead) => {
    switch (lead.status) {
      case "NOVO":
        return "#44B3CF";
      case "CONTATO":
        return "#F4B61D";
      case "NEGOCIANDO":
        return "#F44B1D";
      case "FINALIZADO":
        return "#229544";
      default:
        return "#000000";
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Quantidade Total",
        data: totalData,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box mt={4} width="100%" height="400px">
      <Bar data={data} options={options} />
    </Box>
  );
}
