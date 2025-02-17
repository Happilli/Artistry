// AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken: updateAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
