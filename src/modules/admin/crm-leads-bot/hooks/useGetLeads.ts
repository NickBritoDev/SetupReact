import { useQuery } from "react-query";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../api/crm/connect";

const useGetLeads = (filters: any) => {
  const { token } = useKey();

  // Extrair filtros
  const periodo = filters?.periodo;
  const origem = filters?.origem?.[0];
  const produto = filters?.produto?.[0];
  const status = filters?.status?.[0];
  const subStatus = filters?.subStatus?.[0];

  // Construir a query string dinamicamente
  const queryParams: string[] = [];
  if (periodo) queryParams.push(`dataFiltro=${encodeURIComponent(periodo)}`);
  if (origem) queryParams.push(`origem=${encodeURIComponent(origem)}`);
  if (produto) queryParams.push(`produto=${encodeURIComponent(produto)}`);
  if (status) queryParams.push(`id_status=${encodeURIComponent(status)}`);
  if (subStatus) queryParams.push(`id_substatus=${encodeURIComponent(subStatus)}`);

  // Converter array para string
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  return useQuery(
    ["useGetLeads", filters],
    async () => {
      const endpoint = `/leads/obter${queryString}`;
      const response = await connectCrm.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 5000,
    }
  );
};

export { useGetLeads };
