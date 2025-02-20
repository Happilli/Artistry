// AuthContext.tsx
import { createContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
