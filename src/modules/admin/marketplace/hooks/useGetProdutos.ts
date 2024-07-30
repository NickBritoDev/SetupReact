import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { RetornoConsultaMarketplace } from "../types/types";
import { useToast } from "@chakra-ui/react";

const useGetProdutos = (cnpj: string) => {
  const { token } = useKey();
  const toast = useToast();
  const enabled = !!token && cnpj.length === 18;

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
      enabled,
      refetchOnWindowFocus: false,
      // staleTime: 5000,
      refetchInterval: false,
      retry: 1,
      onError: (err: any) => {
        const message = err.data?.notification?.message ?? "Erro ao Consultar Produtos do Marketplace";
        toast({
          title: "Ocorreu um erro!",
          description: message,
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

      }
    },
  );
};

export { useGetProdutos };
