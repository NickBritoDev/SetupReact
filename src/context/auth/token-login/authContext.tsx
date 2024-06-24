import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { KeyContextType } from "./types";
import { useGetValidacaoToken } from "../../../pages/public/token-login/hooks/getValidacaoToken";

const KeyContext = createContext<KeyContextType | undefined>(undefined);

export const useKey = (): KeyContextType => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error("useKey must be used within a KeyProvider");
  }
  return context;
};

// const base64UrlDecode = (str) => {
//   let output = str.replace(/-/g, '+').replace(/_/g, '/');
//   switch (output.length % 4) {
//     case 0:
//       break;
//     case 2:
//       output += '==';
//       break;
//     case 3:
//       output += '=';
//       break;
//     default:
//       throw 'Invalid base64 string';
//   }
//   const decodedStr = atob(output);
//   try {
//     console.log(JSON.parse(decodedStr))
//     return JSON.parse(decodedStr);
//   } catch (e) {
//     console.error('Erro ao decodificar base64:', e);
//     return null;
//   }
// };

// const decodeJWT = (token) => {
//   const parts = token.split('.');
//   if (parts.length !== 3) {
//     throw 'Token JWT inválido';
//   }
//   return base64UrlDecode(parts[1]);
// };

export const KeyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [keyStatus, setKeyStatus] = useState<boolean | null>(() => {
    const cookieKeyStatus = Cookies.get("keyStatus");
    return cookieKeyStatus !== undefined ? cookieKeyStatus === "true" : null;
  });

  const [token, setToken] = useState<string | null>(
    () => Cookies.get("token") || null,
  );

  const updateKeyStatus = (status: boolean | null, newToken: string | null) => {
    setKeyStatus(status);
    setToken(newToken);
    if (
      status !== null &&
      status !== undefined &&
      newToken !== null &&
      newToken !== undefined
    ) {
      Cookies.set("keyStatus", status.toString(), { expires: 7 });
      Cookies.set("token", newToken, { expires: 7 });
    } else {
      Cookies.remove("keyStatus");
      Cookies.remove("token");
    }
  };

  const { data, error } = useGetValidacaoToken(token);

  useEffect(() => {
    setTimeout(() => {
      if (!data.token) {
        updateKeyStatus(null, null);
      }
    }, 5000);
  }, [data, error, token]);

  // const decodedToken = token ? decodeJWT(token) : null;

  return (
    // <KeyContext.Provider value={{ keyStatus, token, updateKeyStatus, decodedToken }}>
    <KeyContext.Provider value={{ keyStatus, token, updateKeyStatus }}>
      {children}
    </KeyContext.Provider>
  );
};
