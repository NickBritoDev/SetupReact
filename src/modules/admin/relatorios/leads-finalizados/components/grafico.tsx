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
    { name: "RPI", value: totais?.totalReprovadoPoliticaInterna },
    { name: "CF", value: totais?.totalContratoFechado },
    { name: "SI", value: totais?.totalSemInteresse },
    { name: "JPE", value: totais?.totalJaPossuiEmprestimo },
    { name: "SRN", value: totais?.totalSemRegraNegocio },
    { name: "PI", value: totais?.totalParouDeInteragir },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6347",
    "#6A5ACD",
  ];

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
