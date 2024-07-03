import { useMutation } from "react-query";
import { connectCrm } from "../../../../api/crm/connect";
import { useKey } from "../../../../context/auth/token-login/authContext";
import { useToast } from "@chakra-ui/react";

const usePutAlterarStatus = () => {
  const toast = useToast();
  const { token } = useKey();

  const alterarStatus = async (payload: any) => {
    const response = await connectCrm.put("/leads/alterar-status", payload, {
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

  const mutation = useMutation(alterarStatus);

  const UseRequestAlterarStatus = (payload: any) => {
    mutation.mutate(payload);
  };
  return {
    UseRequestAlterarStatus,
    isLoading: mutation.isLoading,
  };
};

export { usePutAlterarStatus };
