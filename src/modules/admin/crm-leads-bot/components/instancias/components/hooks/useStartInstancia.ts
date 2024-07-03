import { useMutation } from "react-query";
import { useState } from "react";
import { connectCrm } from "../../../../../../../api/crm/connect";
import { useKey } from "../../../../../../../context/auth/token-login/authContext";

const useStartInstancia = () => {
  const { token } = useKey();
  const [instanceStart, setInstanceStart] = useState(null);

  const startInstancia = async (payload: any) => {
    const response = await connectCrm.post(
      "/whatsapp/start-instances",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(startInstancia, {
    onSuccess: (data) => {
      setInstanceStart(data);
    },
    onError: (error) => {
      console.error("Erro ao iniciar instância:", error);
    },
  });

  const UseRequestStartInstancia = (payload: any) => {
    mutation.mutate(payload);
  };

  return {
    UseRequestStartInstancia,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    instanceStart,
  };
};

export { useStartInstancia };
