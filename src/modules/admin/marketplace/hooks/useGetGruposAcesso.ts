import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IGruposAcesso } from "../types/types";

type Payload = {
  idFerramenta: number;
  idPromotora: number;
  comUsuarios?: boolean;
  comPermissoes?: boolean;
};

const useGetGruposAcesso = () => {
  const { token } = useKey();

  const gruposAcesso = async ({
    idFerramenta,
    idPromotora,
    comUsuarios = true,
    comPermissoes = true,
  }: Payload) => {
    const response = await connectApi.get<IGruposAcesso[]>(
      `/v1/promotoras/grupos?where={'id_produto': ${idFerramenta}, 'ativo': true, 'id_promotora': ${idPromotora}}&comUsuarios=${comUsuarios}&comPermissoes=${comPermissoes}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(gruposAcesso);

  const useRequestGruposAcesso = (payload: Payload) => {
    mutation.mutate(payload);
  };

  return {
    useRequestGruposAcesso,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};

export { useGetGruposAcesso };
