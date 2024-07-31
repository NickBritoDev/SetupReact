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

export default function ChartComponent() {
  const { data: data_crm } = useGetAcompanhamentoLeads();
  const crm = data_crm ? data_crm : [];

  const leads = crm[0] && typeof crm[0] === "object" ? crm[0] : {};

  const filteredLeads = Object?.entries(leads)?.filter(
    ([key]) => key !== "total",
  );
  const labels = filteredLeads.map(([key]) => key);
  const totalData = filteredLeads.map(([, value]) => Number(value));

  const backgroundColors = labels.map((label) => {
    switch (label) {
      case "Novo":
        return "#44B3CF";
      case "Pendente":
        return "#F4B61D";
      case "Em_Aberto":
        return "#F44B1D";
      case "Concluído":
        return "#229544";
      default:
        return "#d53dbc";
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
