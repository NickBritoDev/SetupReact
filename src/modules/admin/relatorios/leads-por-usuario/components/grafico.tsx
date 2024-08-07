import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const GraphComponent = ({ totais }: any) => {
  const data = [
    { name: "NOVOS", value: totais?.qtde_novos },
    { name: "EM ABERTO", value: totais?.qtde_emAberto },
    { name: "PENDENTE", value: totais?.qtde_pendente },
    { name: "CONCLUIDO", value: totais?.qtde_concluido },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  return (
    <BarChart width={600} height={125} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8">
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default GraphComponent;
