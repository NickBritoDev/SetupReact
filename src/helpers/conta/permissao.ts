import { useGetMinhaConta } from "../../hooks/useGetMinhaConta";

export const useAuthHelpers = () => {
  const { data } = useGetMinhaConta();
  const funcionalidades = data?.funcionalidades ? data?.funcionalidades : true;

  const isAdmin = data?.isAdministradorPromotora
    ? data?.isAdministradorPromotora
    : true;

  const temPermissao = (funcionalidade: string | number) => {
    return funcionalidades && funcionalidades[funcionalidade];
  };

  return {
    isAdmin,
    temPermissao,
  };
};
