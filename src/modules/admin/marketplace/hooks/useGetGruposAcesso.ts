import connectApi from "@api/connect";
import { useKey } from "@context/auth/token-login/authContext";
import { useMutation } from "react-query";
import { IGruposAcesso } from "../types/types";

type Payload = {
  idFerramenta: number;
  idPromotora: number;
  comUsuarios?: boolean;
  comPermissoes?: boolean;
  ativo?: boolean;
};

const useGetGruposAcesso = () => {
  const { token } = useKey();

  const gruposAcesso = async ({
    idFerramenta,
    idPromotora,
    comUsuarios = true,
    comPermissoes = true,
    ativo = true,
  }: Payload) => {
    const response = await connectApi.get<IGruposAcesso[]>(
      `/v1/promotoras/grupos?where={'id_produto': ${idFerramenta}, 'ativo': ${ativo ? "true" : "false"}, 'id_promotora': ${idPromotora}}&comUsuarios=${comUsuarios}&comPermissoes=${comPermissoes}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const { mutate, mutateAsync, ...mutation } = useMutation(gruposAcesso, {
    fetchPolicy: "no-cache",
  });

  const useRequestGruposAcesso = (payload: Payload) => {
    mutate(payload);
  };

  return {
    useRequestGruposAcesso,
    ...mutation,
  };
};

export { useGetGruposAcesso };
