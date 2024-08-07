import { useMutation } from "react-query";
import { connectCrm } from "../../../../api/crm/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { useToast } from "@chakra-ui/react";

const usePutAlterarDadosCliente = () => {
  const toast = useToast();
  const { token } = useKey();

  const alterarDadosCliente = async (payload: any) => {
    const response = await connectCrm.put("/leads/alterar-dados-lead", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      toast({
        title: "Status alterado.",
        description: "O status foi alterado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const mutation = useMutation(alterarDadosCliente);

  const UseRequestAlterarDadosCliente = (payload: any) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestAlterarDadosCliente,
    isLoading: mutation.isLoading,
  };
};

export { usePutAlterarDadosCliente };
