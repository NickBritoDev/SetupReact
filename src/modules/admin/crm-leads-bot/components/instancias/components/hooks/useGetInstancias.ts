import { useQuery } from "react-query";
import { connectCrm } from "../../../../../../../api/crm/connect";
import { useKey } from "../../../../../../../context/auth/token-login/authContext";

const useGetInstancias = (payload: any) => {
  const { token } = useKey();

  return useQuery(
    ["chat_useGetInstancias", { payload }],
    async () => {
      const response = await connectCrm.get(`/whatsapp/obter-instances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 5000,
      refetchInterval: 5000,
    },
  );
};

export { useGetInstancias };
