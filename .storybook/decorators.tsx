import React from "react";
import { KeyProvider } from "../src/context/auth/token-login/authContext";

interface StoryProps {
  children?: React.ReactNode;
}

export const withKeyProvider = ({ children }: StoryProps) => (
  <KeyProvider>{children}</KeyProvider>
);
