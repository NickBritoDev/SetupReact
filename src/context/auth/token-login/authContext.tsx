import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { KeyContextType } from "./types";

const KeyContext = createContext<KeyContextType | undefined>(undefined);

export const useKey = (): KeyContextType => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error("useKey must be used within a KeyProvider");
  }
  return context;
};

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
    if (status !== null && newToken !== null) {
      Cookies.set("keyStatus", status.toString(), { expires: 7 });
      Cookies.set("token", newToken, { expires: 7 });
    } else {
      Cookies.remove("keyStatus");
      Cookies.remove("token");
    }
  };

  return (
    <KeyContext.Provider value={{ keyStatus, token, updateKeyStatus }}>
      {children}
    </KeyContext.Provider>
  );
};
