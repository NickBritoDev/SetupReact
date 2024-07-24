import { useMutation, useQueryClient } from "react-query";
import { useKey } from "../../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../../api/crm/connect";

const usePostUploadFile = () => {
  const { token } = useKey();
  const queryClient = useQueryClient();

  const envioArquivo = async (payload: any) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    
    const response = await connectCrm.post(
      "/whatsapp/upload-arquivo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
    );
    return response.data.location;
  };

  const mutation = useMutation(envioArquivo, {
    onSuccess: () => {
      queryClient.invalidateQueries("useGetMensagensWhatsApp");
    },
  });

  const UseRequestPostUploadFile = async (payload: any): Promise<string> => {
    const { mutateAsync } = mutation;
    return await mutateAsync(payload);
  };

  return {
    UseRequestPostUploadFile,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export { usePostUploadFile };
