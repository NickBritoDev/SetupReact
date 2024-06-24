import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import connectApi from "../../../../api/connect";

const useGetValidacaoToken = (token: string | null) => {
  const navigate = useNavigate();

  return useQuery(
    "login_useGetValidacaoToken",
    async () => {
      if (!token) {
        throw new Error("Token is null");
      }
      try {
        const response = await connectApi.get(
          `/v1/usuarios/auth/login?h=${token}`,
        );
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          navigate("public/login");
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
