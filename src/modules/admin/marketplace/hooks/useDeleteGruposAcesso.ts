import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

type Payload = {
  idGrupo: number;
  forceDelete?: boolean;
};

const useDeleteGrupoAcesso = () => {
  const { token } = useKey();

  const grupoAcesso = async (payload: Payload) => {
    const response = await connectApi.delete(
      `/v1/promotoras/grupos/${payload.idGrupo}?forceDelete=${payload.forceDelete ? "true" : "false"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(grupoAcesso);

  const useRequestDeleteGrupoAcesso = (payload: Payload) => {
    mutation.mutate(payload);
  };
  return {
    useRequestDeleteGrupoAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { useDeleteGrupoAcesso };
