import { useQuery } from "react-query";
import { connectCrm } from "../../../../../api/crm/connect";
import { useKey } from "../../../../../context/auth/token-login/authContext";

const useGetMensagensWhatsApp = (idLead: number, instanciaOut: string) => {
  const { token } = useKey();

  return useQuery(
    "useGetMensagensWhatsApp",
    async () => {
      const response = await connectCrm.get(
        `/whatsapp/obter-mensagens?instance=${instanciaOut}&idLead=${idLead}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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

export { useGetMensagensWhatsApp };
