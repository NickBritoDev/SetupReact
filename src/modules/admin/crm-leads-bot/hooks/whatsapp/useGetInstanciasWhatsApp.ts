import { useQuery } from "react-query";
import { useKey } from "../../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../../api/crm/connect";

const useGetInstanciasWhatsApp = () => {
  const { token } = useKey();

  return useQuery(
    "useGetInstanciasWhatsApp",
    async () => {
      const response = await connectCrm.get(`/whatsapp/obter-instances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 5000,
    },
  );
};

export { useGetInstanciasWhatsApp };
