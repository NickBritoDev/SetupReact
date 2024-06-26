import { useGetMinhaConta } from "../../hooks/useGetMinhaConta";

export const useAuthHelpers = () => {
  const { data } = useGetMinhaConta();
  const funcionalidades = data?.funcionalidades;

  const isAdmin = data?.isAdministradorPromotora;

  const temPermissao = (funcionalidade: string | number) => {
    return funcionalidades && funcionalidades[funcionalidade];
  };

  return {
    isAdmin,
    temPermissao,
  };
};
