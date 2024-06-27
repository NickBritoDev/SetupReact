import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

const useGetUsuariosNivelGerente = ({ perfil, nome }: any) => {
  const { token } = useKey();
  console.log(perfil, nome);

  return useQuery(
    "useGetUsuariosNivelGerente",
    async () => {
      const response = await connectApi.get(
        `/v1/usuarios?where={"${perfil}": "${nome}", "perfil": "supervisor"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto"]`,
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

export { useGetUsuariosNivelGerente };
