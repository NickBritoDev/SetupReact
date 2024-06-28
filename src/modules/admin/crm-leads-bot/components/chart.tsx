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
import { useGetAcompanhamentoLeads } from "../hooks/useGetAcompanhamentoLeads";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const initialData = [
  {
    Novo: "0",
    Contato: "0",
    Finalizado: "0",
    Negociando: "0",
  },
];

export default function ChartComponent() {
  const { data: data_crm } = useGetAcompanhamentoLeads();
  const crm = data_crm ? data_crm : initialData;

  const leads = crm[0];

  const labels = Object.keys(leads);
  const totalData = Object.values(leads).map(Number);

  const backgroundColors = labels.map((label) => {
    switch (label) {
      case "Novo":
        return "#44B3CF";
      case "Contato":
        return "#F4B61D";
      case "Negociando":
        return "#F44B1D";
      case "Finalizado":
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
