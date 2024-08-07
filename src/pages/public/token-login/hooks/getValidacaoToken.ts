import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";

const useGetValidacaoToken = (token: string | null) => {
  return useQuery(
    "login_useGetValidacaoToken",
    async () => {
      try {
        const response = await connectApi.get(
          `/v1/usuarios/auth/login?h=${token}`,
        );
        return response.data.token;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          window.location.href =
            "https://www.portalmaisvalor.com/paginas/login.html";
        }
        throw error;
      }
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 30000,
    },
  );
};

export { useGetValidacaoToken };
