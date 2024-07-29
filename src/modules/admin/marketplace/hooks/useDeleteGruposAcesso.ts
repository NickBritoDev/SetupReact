import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";

const useDeleteGrupoAcesso = () => {
  const { token } = useKey();

  const grupoAcesso = async (idGrupo: number) => {
    const response = await connectApi.delete(
      `/v1/promotoras/grupos/${idGrupo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(grupoAcesso);

  const useRequestDeleteGrupoAcesso = (idGrupo: number) => {
    mutation.mutate(idGrupo);
  };
  return {
    useRequestDeleteGrupoAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { useDeleteGrupoAcesso };
