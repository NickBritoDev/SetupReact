import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";

const useGetValidacaoToken = (token: string | null) => {
  return useQuery(
    "login_useGetValidacaoToken",
    async () => {
      if (!token) {
        throw new Error("Token not available");
      }

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
      enabled: !!token, // Habilita a requisição apenas se o token estiver disponível
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 30000,
    },
  );
};

export { useGetValidacaoToken };
