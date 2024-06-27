import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { useGetMinhaConta } from "../../../../hooks/useGetMinhaConta";

const useGetUsuariosNivelSuperintendente = () => {
  const { token } = useKey();
  const { data } = useGetMinhaConta();

  return useQuery(
    "useGetUsuariosNivelSuperintendente",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={"${data.cargo}": "${data?.nome}", "perfil": "GERENTE"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto"]`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      // staleTime: 500,
      refetchInterval: 0,
    },
  );
};

export { useGetUsuariosNivelSuperintendente };
