import { useQuery } from "react-query";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../api/crm/connect";

const useGetLeads = () => {
  const { token } = useKey();

  return useQuery(
    "useGetLeads",
    async () => {
      const response = await connectCrm.get(`/leads/obter`, {
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

export { useGetLeads };
