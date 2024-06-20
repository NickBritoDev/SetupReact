import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";

const useGetValidacaoToken = (token: string | null) => {
  return useQuery(
    "login_useGetValidacaoToken",
    async () => {
      if (!token) {
        throw new Error("Token is null");
      }
      const response = await connectApi.get(`/v1/api/public/auth/?h=${token}`);
      return response.data;
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
