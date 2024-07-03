import { useMutation, useQueryClient } from "react-query";
import { useKey } from "../../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../../api/crm/connect";

const usePostMensagensWhatsApp = () => {
  const { token } = useKey();
  const queryClient = useQueryClient();

  const envioMensagem = async (payload: any) => {
    const response = await connectCrm.post(
      "/whatsapp/enviar-mensagem",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(envioMensagem, {
    onSuccess: () => {
      queryClient.invalidateQueries("useGetMensagensWhatsApp");
    },
  });

  const UseRequestPostMensagensWhatsApp = (payload: any) => {
    mutation.mutate(payload);
  };

  return {
    UseRequestPostMensagensWhatsApp,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePostMensagensWhatsApp };
