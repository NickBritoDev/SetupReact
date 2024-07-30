import { useQuery } from "react-query";
import connectApi from "../../../../api/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";

type Payload = { cnpjMatriz: string, canRefetch?: boolean; };
type ResponseGetUsuarios = {
  cnpj_matriz: string;
  foto: string;
  gerente: string;
  id_acesso: number;
  nome: string;
  perfil: string;
  superintendente: string;
  supervisor: string;
}[];

const useGetUsuarios = ({ cnpjMatriz, canRefetch = true }: Payload) => {
  const { token } = useKey();

  return useQuery(
    ["useGetUsuarios", cnpjMatriz],
    async () => {
      const response = await connectApi.get<ResponseGetUsuarios>(
        `/v1/usuarios?where={"cnpj_matriz": "${cnpjMatriz}"}&select=["id_acesso", "perfil", "nome", "cnpj_matriz", "foto", "supervisor", "gerente", "superintendente" ]`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: canRefetch ? 5000 : Infinity,
      refetchInterval: canRefetch ? 5000 : false,
    },
  );
};

export { useGetUsuarios };
