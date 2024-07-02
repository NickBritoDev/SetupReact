import { useMutation } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const usePostMensagensWhatsApp = () => {
  const { token } = useKey();

  const envioMensagem = async (payload: any) => {
    const response = await connectApi.post(
      "/v1/produtos/solicitacoes",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(envioMensagem);

  const UseRequestPostMensagensWhatsApp = (payload: any) => {
    mutation.mutate(payload.payload);
  };
  return {
    UseRequestPostMensagensWhatsApp,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePostMensagensWhatsApp };
