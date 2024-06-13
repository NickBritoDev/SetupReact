export interface KeyContextType {
  keyStatus: boolean | null;
  token: string | null;
  updateKeyStatus: (status: boolean | null, token: string | null) => void;
}
