import { useQuery } from "react-query";
import connectApi from "../api/connect";
import { useKey } from "../context/auth/token-login/authContext";

const useGetMinhaConta = () => {
  const { token } = useKey();

  return useQuery(
    "useGetMinhaConta",
    async () => {
      const response = await connectApi.get("/v1/usuarios/minha-conta", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
      staleTime: 5000 * 1000 * 5,
      refetchInterval: 300000,
    },
  );
};

export { useGetMinhaConta };
