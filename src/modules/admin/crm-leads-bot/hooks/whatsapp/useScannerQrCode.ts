import { useMutation } from "react-query";
import { useState } from "react";
import { useKey } from "../../../../../context/auth/token-login/authContext";
import { connectCrm } from "../../../../../api/crm/connect";

interface QrCodeResponse {
  response: Array<{ qrcode: string }>;
}

const useScannerQrCode = () => {
  const { token } = useKey();
  const [qrCodeData, setQrCodeData] = useState<QrCodeResponse | null>(null);

  const scannerQrCode = async (payload: any) => {
    const response = await connectCrm.post(
      "/whatsapp/obter-instance-qrcode",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation(scannerQrCode, {
    onSuccess: (data) => {
      setQrCodeData(data);
    },
    onError: (error) => {
      console.error("onError:", error);
    },
  });

  const UseRequestScannerQrCode = (payload: any) => {
    mutation.mutate(payload);
  };

  return {
    UseRequestScannerQrCode,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    qrCodeData,
  };
};

export { useScannerQrCode };
