import { connectCrm } from "@api/crm/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useQuery } from "react-query";

const useGetFiltros = () => {
  const { token } = useKey();

  return useQuery(
    "useGetFiltros",
    async () => {
      const response = await connectCrm.get(`/sistema/opcoes-crm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
      staleTime: 30000,
      refetchInterval: 30000,
    },
  );
};

export { useGetFiltros };
