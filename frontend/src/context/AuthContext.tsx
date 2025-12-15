import type { User } from '../types/user.ts';
import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("use Auth deve essere usato dentro a AuthProvider");

  return ctx;
}
