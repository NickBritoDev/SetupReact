import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { RetornoConsultaMarketplace } from "../types/types";

const useGetProdutos = (cnpj: string) => {
  const { token } = useKey();

  return useQuery(
    ["useGetProdutos", cnpj],
    async () => {
      const response = await connectApi.get<RetornoConsultaMarketplace[]>(
        `/v1/produtos/marketplace?cnpj=${cnpj}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      enabled: !!token && !!cnpj,
      refetchOnWindowFocus: false,
      // staleTime: 5000,
      refetchInterval: false,
    },
  );
};

export { useGetProdutos };
