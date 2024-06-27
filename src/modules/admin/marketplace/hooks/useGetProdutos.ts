import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const useGetProdutos = () => {
  const { token } = useKey();

  return useQuery(
    "useGetProdutos",
    async () => {
      const response = await connectApi.get(`/v1/produtos/marketplace`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
      // staleTime: 5000,
      refetchInterval: false,
    },
  );
};

export { useGetProdutos };
