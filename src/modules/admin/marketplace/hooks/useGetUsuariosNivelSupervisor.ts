import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const useGetUsuariosNivelSupervisor = ({ perfil, nome }: any) => {
  const { token } = useKey();

  return useQuery(
    "useGetUsuariosNivelSupervisor",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={"${perfil}": "${nome}", "perfil": "parceiro"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto"]`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      enabled: !!perfil || !!nome,
      refetchOnWindowFocus: false,
      // staleTime: 500,
      refetchInterval: 0,
    },
  );
};

export { useGetUsuariosNivelSupervisor };
